import React from "react";
import { userState } from "../stores/auth/atom";
import { useRecoilValue, useRecoilState } from "recoil";
import { holdingState } from "../stores/holdings/atom";
import { fundingState } from "../stores/fundings/atom";
import {
  holdingStatus,
  categoryHoldingStatus,
  productHoldingStatus,
} from "../stores/holdings/selector";

import {
  Box,
  Text,
  Container,
  SimpleGrid,
  Center,
  Button,
  Link,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
} from "@chakra-ui/react";
import { GiHedgehog } from "react-icons/gi";
import { fundingStatus } from "../stores/fundings/selector";

import LocalNav from "../components/LocalNav";

import { PieChart, Pie, Label, ResponsiveContainer } from "recharts";

function MyAccount() {
  const user = useRecoilValue(userState);
  const [holdings, setHoldings] = useRecoilState(holdingState);
  const [fundings, setFundings] = useRecoilState(fundingState);
  const { totalHolding } = useRecoilValue(holdingStatus);
  console.log(`User: ${user}`);
  console.log(holdings);
  const { totalFunds } = useRecoilValue(fundingStatus);

  const { categoryStore } = useRecoilValue(categoryHoldingStatus);

  const { productStore } = useRecoilValue(productHoldingStatus);

  const pieData = categoryStore.map((holding) => {
    return {
      category: holding.category,
      value: holding.value,
    };
  });

  let date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const sec = String(date.getSeconds()).padStart(2, "0");

  date = `${yyyy}-${mm}-${dd} ${hour}:${min}:${sec}`;

  const sellAll = (event) => {
    const name = event.target.name;
    const product = holdings.find((product) => product.title === name);
    const { value, amount } = productStore.find(
      (product) => product.title === name
    );

    if (value <= 0) return;

    const newSell = {
      title: product.title,
      category: product.category,
      currentPrice: product.price,
      trade: "sell",
      price: -value,
      amount: -amount,
      date: date,
      id: Math.floor(Math.random() * 10000),
    };
    setHoldings((prevSell) => {
      return [...prevSell, newSell];
    });
    const increaseFunds = {
      input: value,
      date: date,
      id: Math.floor(Math.random() * 10000),
    };
    setFundings((prevFunds) => {
      return [...prevFunds, increaseFunds];
    });
  };

  return (
    <Box minH="100vh">
      <LocalNav />
      <Center>
        <Container
          color="var(--chakra-colors-gray-300)"
          maxW="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="row"
            alignItems="center"
            gap={2}
          >
            <Text fontSize="3xl">Hey hog: {user}</Text>
            <GiHedgehog size={50} />
          </Box>
          <StatGroup
            color="var(--chakra-colors-gray-300)"
            // alignSelf="flex-end"
          >
            <Stat spacing={2}>
              <StatHelpText fontSize="xl">
                Period: 3m
                <StatArrow type="increase" color="green" />
                13.37%
              </StatHelpText>
            </Stat>
          </StatGroup>
          <Center>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              pb={4}
            >
              {" "}
              <Text fontSize="2xl" color="white">
                Total value: ${(totalHolding + totalFunds).toLocaleString()}
              </Text>
              <Text fontSize="1xl" alignSelf="flex-end">
                Available funds: {totalFunds.toLocaleString()}
              </Text>
              <Text fontSize="1xl" alignSelf="flex-end">
                Hedge value: {totalHolding.toLocaleString()}
              </Text>
            </Box>
          </Center>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart height={350}>
              <Pie
                data={pieData}
                dataKey="value"
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  category,
                  percent,
                }) => {
                  const RADIAN = Math.PI / 180;
                  // eslint-disable-next-line
                  const radius = 25 + innerRadius + (outerRadius - innerRadius);
                  // eslint-disable-next-line
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  // eslint-disable-next-line
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#8884d8"
                      // fontSize="16px"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                    >
                      {(percent * 100).toFixed(0)}%, {category},{" "}
                      {value.toLocaleString()}
                    </text>
                  );
                }}
                fill="none"
              >
                <Label
                  // angle={270}
                  position="insideLeft"
                  offset={10}
                  value="Hedges by Cat."
                  style={{
                    textAnchor: "middle",
                    // fontSize: "150%",
                    fill: "var(--chakra-colors-gray-300)",
                  }}
                ></Label>
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <SimpleGrid
            templateColumns={{
              base: "1fr 1fr",
              sm: "1fr 1fr 1fr",
              md: "1fr 1fr 1fr",
              lg: "1fr 1fr 1fr 1fr",
            }}
            spacing={4}
            gap={4}
            py={2}
          >
            {productStore &&
              productStore.map((holding) =>
                holding.value ? (
                  <Box
                    maxW="350px"
                    display="flex"
                    flexDirection="column"
                    border="1px white solid"
                    borderRadius="12px"
                    key={holding.id}
                    alignItems="flex-start"
                    p={2}
                    fontSize={{ base: "smaller", sm: "lg", md: "lg" }}
                  >
                    <Link href="#" fontWeight="bold">
                      {holding.title}
                    </Link>
                    <Text>Amont: {holding.amount.toLocaleString()}</Text>
                    <Text>Value: {holding.value.toLocaleString()}</Text>
                    <Button
                      colorScheme="green"
                      width="100%"
                      wordWrap="break-word"
                      whiteSpace="normal"
                      size="sm"
                      fontSize={{
                        base: "smaller",
                        sm: "sm",
                        md: "sm",
                        lg: "medium",
                      }}
                      name={holding.title}
                      onClick={sellAll}
                    >
                      Sell All {holding.title}s
                    </Button>
                  </Box>
                ) : (
                  <></>
                  // Correct this for KK4
                )
              )}
          </SimpleGrid>
        </Container>
      </Center>
    </Box>
  );
}

export default MyAccount;
