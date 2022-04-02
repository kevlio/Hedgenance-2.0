import React, { useEffect, useState } from "react";
import { userState, usersState, currentIDState } from "../stores/auth/atom";
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
} from "@chakra-ui/react";
import { GiHedgehog } from "react-icons/gi";

import LocalNav from "../components/LocalNav";

import { PieChart, Pie, Label, ResponsiveContainer } from "recharts";

import axios from "axios";

import { assemblyState } from "../stores/assembly/atom";

import { assemblyStatus } from "../stores/assembly/atom";

function MyAccount() {
  console.log(assemblyStatus);

  const { assemblyStore } = useRecoilValue(assemblyStatus);
  console.log(assemblyStore);
  const [assembly, setAssembly] = useRecoilState(assemblyState);
  const [holdings, setHoldings] = useRecoilState(holdingState);
  console.log(holdings);
  const [fundings, setFundings] = useRecoilState(fundingState);

  // const currentUserID = useRecoilValue(currentIDState);
  // const [users, setUsers] = useRecoilState(usersState);
  // const { categoryStore } = useRecoilValue(categoryHoldingStatus);
  // const { productStore } = useRecoilValue(productHoldingStatus);
  // console.log(currentUserID);

  const { totalFunds } = useRecoilValue(fundingStatus);
  const { totalHolding } = useRecoilValue(holdingStatus);
  console.log(totalHolding);
  console.log(holdings);
  const [totalHoldings, setTotalHoldings] = useState([]);

  const { productStore } = useRecoilValue(productHoldingStatus);

  console.log(productStore);
  console.log(holdings);

  const [currentUser, setCurrentUser] = useRecoilState(userState);

  const currentUserID = useRecoilValue(currentIDState);
  const [currentCryptoPrice, setCurrentCryptoPrice] = useState("");

  // setFundings((prevFunds) => {
  //   return [newFund, ...prevFunds];
  // });

  // useEffect(() => {
  //   setAssembly([{ fundings: fundings }]);
  // }, [fundings]);

  console.log(assembly);
  console.log(currentUser);

  let categoryTotal = [];
  let cryptoStore = [];

  // if (currentUser.holdings.history.length > 0) {
  console.log("true has holding history");

  // const uniqueCrypto =
  //   currentUser.holdings
  //     ? [
  //         ...new Set(
  //           currentUser.holdings.history.map((holding) => holding.title)
  //         ),
  //       ]
  //     : [];

  // console.log(uniqueCrypto);
  // // }

  // useEffect(() => {
  //   for (let i = 0; i < uniqueCrypto.length; i++) {
  //     categoryTotal[i] = cryptoAssemble.filter(
  //       (crypto) => crypto.title === uniqueCrypto[i]
  //     );

  //     const totalAmountCategory = categoryTotal[i].reduce(
  //       (previousValue, currentValue) =>
  //         previousValue + parseInt(currentValue.amount),
  //       0
  //     );
  //     const totalPriceCategory = categoryTotal[i].reduce(
  //       (previousValue, currentValue) =>
  //         previousValue + parseInt(currentValue.price),
  //       0
  //     );
  //     cryptoStore.push({
  //       id: i,
  //       title: uniqueCrypto[i],
  //       amount: totalAmountCategory,
  //       value: totalPriceCategory,
  //     });
  //     console.log(categoryTotal);
  //     console.log(cryptoStore);

  //     // setTotalHoldings(cryptoStore);
  //   }
  // }, []);

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
    const name = event.target.name;
    console.log(name);
    const product = currentUser.holdings.history.find(
      (product) => product.title === name
    );
    console.log(product);
    const { value, amount, title } = totalHoldings.find(
      (product) => product.title === name
    );

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
    cryptoById(product.coinID);
    console.log(coin);

    if (amount <= 0) return;

    const newSell = {
      title: product.title,
      category: "Cryptocurrencies",
      currentPrice: currentCryptoPrice,
      trade: "sell",
      price: -currentCryptoPrice * amount,
      amount: -amount,
      date: date,
      id: Math.floor(Math.random() * 10000),
      coinID: product.coinID,
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

  useEffect(() => {
    // if (currentUser.funds.history) {
    //   const newFundings = currentUser.funds.history.filter(
    //     (prevFundings) => !fundings.some((fund) => prevFundings.id === fund.id)
    //   );
    //   console.log(newFundings);
    //   setFundings([...fundings, ...newFundings]);
    // }
    // if (currentUser.holdings.history) {
    //   const newHoldings = currentUser.holdings.history.filter(
    //     (prevHoldings) => !holdings.some((fund) => prevHoldings.id === fund.id)
    //   );
    //   console.log(newHoldings);
    //   setHoldings([...holdings, ...newHoldings]);
    // }
  }, []);

  useEffect(() => {
    // setUpdateUsers(
    //   updateUsers.map((user) => {
    //     return {
    //       ...user,
    //       funds: {
    //         history: fundings,
    //         total: totalFunds,
    //       },
    //       holdings: {
    //         history: holdings,
    //         total: totalHolding,
    //       },
    //     };
    //     return user;
    //   })
    // );

    // setCurrentUser({
    //   ...currentUser,
    //   funds: {
    //     history: fundings,
    //     total: totalFunds,
    //   },
    //   holdings: {
    //     history: holdings,
    //     total: totalHolding,
    //   },
    // });

    console.log(fundings);
  }, [fundings]);

  console.log(fundings);
  console.log(holdings);

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
            {productStore.map(
              (holding) => (
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
                    {(holding.value / holding.amount).toLocaleString()}
                  </Text>
                  <Text>Value: {holding.value.toLocaleString()}</Text>
                  <Button
                    colorScheme="green"
                    width="100%"
                    // wordWrap="break-word"
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
              )
              // Correct this for KK4
            )}
          </SimpleGrid>
        </Container>
      </Center>
    </Box>
  );
}

export default MyAccount;
