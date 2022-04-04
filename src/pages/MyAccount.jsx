import React, { useEffect, useState, useCallback } from "react";
import { userState, usersState } from "../stores/users/atom";
import { useRecoilValue, useRecoilState } from "recoil";
import { holdingState } from "../stores/holdings/atom";
import { fundingState } from "../stores/fundings/atom";
import {
  holdingStatus,
  categoryHoldingStatus,
  productHoldingStatus,
} from "../stores/holdings/selector";

import { fundingStatus } from "../stores/fundings/selector";

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
  useDisclosure,
  Fade,
} from "@chakra-ui/react";
import { GiHedgehog } from "react-icons/gi";

import LocalNav from "../components/LocalNav";

import { PieChart, Pie, Label, ResponsiveContainer } from "recharts";

import axios from "axios";

function MyAccount() {
  const { isOpen, onToggle } = useDisclosure();

  const [holdings, setHoldings] = useRecoilState(holdingState);
  const [fundings, setFundings] = useRecoilState(fundingState);
  const { totalFunds } = useRecoilValue(fundingStatus);
  const { totalHolding } = useRecoilValue(holdingStatus);
  const { productStore } = useRecoilValue(productHoldingStatus);

  const [currentUser, setCurrentUser] = useRecoilState(userState);

  const [currentCryptoPrice, setCurrentCryptoPrice] = useState(0);

  const pieData = productStore.map((holding) => {
    return {
      category: holding.title,
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

  const [coin, setCoin] = useState([]);

  const sellAll = (event) => {
    onToggle();
    const name = event.target.name;
    console.log(name);
    console.log(currentUser.holdings.history);
    const product = productStore.filter((crypto) => {
      return crypto.coinID === event.target.name;
    });
    console.log(product);

    // Verkar onödigt komplicerat. Se över

    const coinID = product[0].coinID;
    const amount = product[0].amount;
    const title = product[0].title;
    const value = product[0].value;

    console.log(coinID, amount, title, value);

    // Get current value of this Crypto
    const cryptoById = (coinID) => {
      axios
        .get(`https://api.coingecko.com/api/v3/coins/${coinID}`)
        .then((res) => {
          setCoin(res.data);
          console.log(res.data);
          console.log(res.data.market_data.current_price.eur);
          setCurrentCryptoPrice(res.data.market_data.current_price.eur);
          // navigate(`/crypto/${coin}`);
        })
        .catch((error) => console.log(error));
    };
    cryptoById(coinID);

    if (amount <= 0) return;

    if (currentCryptoPrice !== 0) {
      const newSell = {
        title: title,
        category: "Cryptocurrencies",
        currentPrice: currentCryptoPrice,
        trade: "sell",
        price: -value,
        amount: -amount,
        date: date,
        id: Math.floor(Math.random() * 10000),
        coinID: coinID,
      };
      setHoldings((prevSell) => {
        return [...prevSell, newSell];
      });
      setCurrentUser({
        ...currentUser,
        holdings: {
          history: holdings,
          total: totalHolding,
        },
      });
      const increaseFunds = {
        input: currentCryptoPrice * amount,
        date: date,
        id: Math.floor(Math.random() * 10000),
      };
      setFundings((prevFunds) => {
        return [...prevFunds, increaseFunds];
      });
      setCurrentUser({
        ...currentUser,
        funds: {
          history: fundings,
          total: totalFunds,
        },
      });
    }
  };

  useEffect(() => {
    setCurrentUser({
      ...currentUser,
      funds: {
        history: fundings,
        total: totalFunds,
      },
      holdings: {
        history: holdings,
        total: totalHolding,
      },
    });
  }, [fundings]);

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
            <Text fontSize="3xl">Hey hog: {currentUser.username}</Text>
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
                Total value: ${/* Fixa felhantering också... */}
                {(
                  (totalFunds && totalFunds) + (totalHolding && totalHolding)
                ).toLocaleString()}
              </Text>
              <Text fontSize="1xl" alignSelf="flex-end">
                Available funds:{" "}
                {(totalFunds ? totalFunds : 0).toLocaleString()}
              </Text>
              <Text fontSize="1xl" alignSelf="flex-end">
                Hedge value: {totalHolding && totalHolding.toLocaleString()}
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
                    <Text>
                      Avg. price:{" "}
                      {holding.value / holding.amount
                        ? (holding.value / holding.amount).toLocaleString()
                        : "-"}
                    </Text>
                    <Text>Value: {holding.value.toLocaleString()}</Text>
                    <Button
                      colorScheme="green"
                      width="100%"
                      bg={holding.coinID === coin.id ? "red" : "green.400"}
                      // wordWrap="break-word"
                      whiteSpace="normal"
                      size="sm"
                      fontSize={{
                        base: "smaller",
                        sm: "sm",
                        md: "sm",
                        lg: "medium",
                      }}
                      name={holding.coinID}
                      onClick={sellAll}
                    >
                      {holding.coinID === coin.id
                        ? "Are you sure?"
                        : `Sell All ${holding.title}s`}
                      {/* Sell All {holding.title}s */}
                    </Button>
                  </Box>
                ) : (
                  <></>
                )
              )}
          </SimpleGrid>
        </Container>
      </Center>
    </Box>
  );
}

export default MyAccount;
