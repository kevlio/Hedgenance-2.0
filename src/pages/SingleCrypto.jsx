import React, { useState, useRef, useEffect, Suspense } from "react";

import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

import { holdingState } from "../stores/holdings/atom";
import { GiHedgehog } from "react-icons/gi";

import { fundingState } from "../stores/fundings/atom";
import { fundingStatus } from "../stores/fundings/selector";

import {
  Box,
  Text,
  Stack,
  Button,
  Center,
  Input,
  Image,
  Container,
  Link,
  SimpleGrid,
  useDisclosure,
  Fade,
  Collapse,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  List,
  ListItem,
} from "@chakra-ui/react";
import { MdCall } from "react-icons/md";
import { productHoldingStatus } from "../stores/holdings/selector";

import { cryptoState, singleCryptoState } from "../stores/products/cryptos";
import axios from "axios";

function SingleFetchedProduct() {
  const { isOpen, onToggle } = useDisclosure();
  const [show, setShow] = React.useState(false);

  const handleToggle = () => setShow(!show);
  const params = useParams();
  const [coin, setCoin] = useRecoilState(singleCryptoState);
  const [amount, setAmount] = useState("");

  const coinStore = useRecoilValue(cryptoState);
  console.log(coinStore);
  console.log(params.id);

  const coinFind = coinStore.find((coin) => coin.id === params.id);
  console.log(coinFind);
  console.log(coin);

  function handleChange(event) {
    const value = event.target.value;
    setAmount(value);
    console.log(amount);
  }

  //   useEffect(() => {
  //     axios
  //       .get(`https://api.coingecko.com/api/v3/coins/${params.id}`)
  //       .then((res) => {
  //         setCoin(res.data);
  //         console.log(res.data);
  //       })
  //       .catch((error) => console.log(error));
  //   }, []);

  if (!coin) {
    return <p>Loading profile...</p>;
  }

  return (
    <Box
      textColor="white"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box display="flex">
        <Box>
          <Image src={coin.image.large} boxSize="100px" alignSelf="center" />
          <Text fontSize="2xl" fontWeight="bold" color={"green.400"}>
            {coinFind.name}
          </Text>
          <Text>Coin rank: {coin.coingecko_rank}</Text>
        </Box>
        <Box alignSelf="center">
          Categories:
          {coin.categories.map((category) => (
            <List key={category}>
              <ListItem fontSize="smaller">{category}</ListItem>
            </List>
          ))}
        </Box>
      </Box>

      <Image src="https://assets.coinbase.com/exchange/assets/pro-trading-viewbc7481fccd81a9210688b5f0ca42fde5.png"></Image>
      <Table variant="simple" size="sm">
        {/* Todo: Dynamic sizing table  size={{ base: "sm", sm: "md", md: "md" }} */}
        <Thead>
          <Tr>
            <Th>{coinFind.last_updated.replace(/[T_Z]/g, " ").slice(0, -5)}</Th>
            <Th isNumeric>EUR</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Current</Td>
            <Td isNumeric>
              {coin.market_data.current_price.eur.toLocaleString()}
            </Td>
          </Tr>
        </Tbody>
        <Tbody>
          <Tr>
            <Td>Change 24h</Td>
            <Td isNumeric>
              {coin.market_data.price_change_percentage_24h.toFixed(2)}%
            </Td>
          </Tr>
        </Tbody>
        <Tbody>
          <Tr>
            <Td>High 24h:</Td>
            <Td isNumeric>{coinFind.high_24h.toLocaleString()}</Td>
          </Tr>
        </Tbody>
        <Tbody>
          <Tr>
            <Td>Low 24h</Td>
            <Td isNumeric>{coinFind.low_24h.toLocaleString()}</Td>
          </Tr>
        </Tbody>
        <Tbody>
          <Tr>
            <Td>ATH {coin.market_data.ath_date.eur.slice(0, -14)}</Td>
            <Td isNumeric>{coin.market_data.ath.eur.toLocaleString()}</Td>
          </Tr>
        </Tbody>
        <Tbody>
          <Tr>
            <Td>ATL {coin.market_data.atl_date.eur.slice(0, -14)}</Td>
            <Td isNumeric>{coin.market_data.atl.eur.toLocaleString()} </Td>
          </Tr>
        </Tbody>

        <Tfoot>
          <Tr>
            <Th></Th>
            <Th isNumeric> </Th>
          </Tr>
        </Tfoot>
      </Table>
      <Box display="flex" flexDirection="row" ml="130px">
        <Button
          width="100px"
          rightIcon={<MdCall />}
          colorScheme="green"
          variant="outline"
          value="buy"
        >
          Buy
        </Button>
        <Button
          width="100px"
          rightIcon={<MdCall />}
          colorScheme="blue"
          variant="outline"
          value="sell"
        >
          Sell
        </Button>
      </Box>
      <Box display="flex">
        <Button colorScheme="green" bg="none" width="130px">
          Max amount
        </Button>
        <Input
          placeholder="amount"
          type="number"
          onChange={handleChange}
          maxW="200px"
        />
      </Box>
      <Box display="flex">
        <Button colorScheme="green" bg="none" width="130px">
          Current price
        </Button>
        <Input defaultValue={coinFind.current_price} maxW="200px" />
      </Box>
      <Box display="flex">
        <Button colorScheme="green" bg="none" width="130px">
          Desired price
        </Button>
        <Input defaultValue={coinFind.current_price} maxW="200px" />
      </Box>
      <Box display="flex">
        <Button colorScheme="green" bg="none" width="130px">
          Total price
        </Button>
        <Input
          maxW="200px"
          placeholder="amount x price"
          defaultValue={amount && amount * coinFind.current_price}
        />
      </Box>
      <Button colorScheme="green" ml="130px" width="200px" mt={1}>
        Place (buy/sell dep) order
      </Button>
      <Box display="flex" flexDirection="column">
        <Button
          colorScheme="green"
          onClick={handleToggle}
          ml="130px"
          mt={1}
          width="200px"
        >
          {show ? "Hide" : "More"} information
        </Button>
        <Collapse startingHeight={0} in={show}>
          <Text
            // textAlign="flex-start"
            // alignContent="flex-start"
            // alignSelf="flex-start"
            width="200px"
            ml="130px"
            mt={1}
          >
            {coin.description.en}
          </Text>
        </Collapse>
      </Box>
    </Box>
  );
}

export function SingleCryptoPage() {
  return (
    //   Suspense funkar ej vid fetch via ID?...
    // <Suspense fallback={<h1>Loading Crypto..</h1>}>
    <Center>
      <Container>
        <SingleFetchedProduct />
      </Container>
    </Center>
    // </Suspense>
  );
}

function SingleCrypto() {
  const params = useParams();

  const [holdings, setHoldings] = useRecoilState(holdingState);
  const [amount, setAmount] = useState("");
  const { totalFunds } = useRecoilValue(fundingStatus);
  const [fundings, setFundings] = useRecoilState(fundingState);

  const [coin, setCoin] = useState([]);
  const [coinFetched, setCoinFetched] = useState(false);
  //   https://api.coingecko.com/api/v3/coins/bitcoin

  console.log(params.id);

  //   useEffect(() => {
  //     axios
  //       .get(`https://api.coingecko.com/api/v3/coins/${params.id}`)
  //       .then((res) => {
  //         setCoin(res.data);
  //         console.log(res.data);
  //         setCoinFetched(true);
  //       })
  //       .catch((error) => console.log(error));
  //   }, []);

  useEffect(() => {
    inputRef.current.focus();
  });

  //   function handleChange(event) {
  //     const value = event.target.value;
  //     props.setInput(value);
  //   }

  const inputRef = useRef();

  function handleField() {
    inputRef.current.value = null;
  }

  let date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const sec = String(date.getSeconds()).padStart(2, "0");

  date = `${yyyy}-${mm}-${dd} ${hour}:${min}:${sec}`;

  const { isOpen, onToggle } = useDisclosure();

  const buy = () => {
    console.log(coin.market_data.current_price.eur * amount);

    if (amount <= 0 || totalFunds < coin.market_data.current_price.eur * amount)
      return;

    // Alert funds not available
    const newBuy = {
      title: coin.name,
      category: "Cryptocurrencies",
      currentPrice: coin.market_data.current_price.eur,
      trade: "buy",
      price: coin.market_data.current_price.eur * amount,
      amount: +amount,
      date: date,
      id: Math.floor(Math.random() * 10000),
    };
    setHoldings((prevBuy) => {
      return [...prevBuy, newBuy];
    });
    const reduceFunds = {
      input: -coin.market_data.current_price.eur * amount,
      date: date,
      id: Math.floor(Math.random() * 10000),
    };
    setFundings((prevFunds) => {
      return [...prevFunds, reduceFunds];
    });
    console.log(holdings);
    console.log(fundings);
  };

  const sell = () => {
    if (
      amount <= 0 ||
      !holdingSingleProduct ||
      holdingSingleProduct.amount <= 0 ||
      holdingSingleProduct.amount < amount
    )
      return;

    // Alert not sufficient amount
    const newSell = {
      title: products.title,
      category: products.category,
      currentPrice: products.price,
      trade: "sell",
      price: -products.price * amount,
      amount: -amount,
      date: date,
      id: Math.floor(Math.random() * 10000),
    };
    setHoldings((prevBuy) => {
      return [...prevBuy, newSell];
    });
    const increaseFunds = {
      input: products.price * +amount,
      date: date,
      id: Math.floor(Math.random() * 10000),
    };
    setFundings((prevFunds) => {
      return [...prevFunds, increaseFunds];
    });
  };

  function handleChange(event) {
    const value = event.target.value;
    setAmount(value);
  }

  return (
    // <Stack>
    <Container minW="100%">
      <Center gap={4} flexDirection="column">
        <Stack
          direction="column"
          spacing={1}
          // width="8xl"
          color="var(--chakra-colors-gray-300)"
        >
          <Image
            boxSize="200px"
            objectFit="cover"
            src={coinFetched ? coin.image.large : ""}
            alt=""
            alignSelf="center"
          />
          <Text>{coinFetched && coin.name}</Text>
          <Text>{coinFetched && coin.description.en}</Text>
          <Text maxH="100px" overflowY="hidden">
            $
            {coinFetched && coin.market_data.current_price.eur.toLocaleString()}
          </Text>
          {/* <Input type="range" onChange={handleChange} size="lg" /> */}
          <Box display="flex">
            <Input
              ref={inputRef}
              placeholder="amount"
              type="number"
              onChange={handleChange}
              size="lg"
            />
            <Input
              placeholder="current price"
              value={coinFetched && coin.market_data.current_price.eur}
              type="number"
              onChange={handleChange}
              size="lg"
            />
            {/* <Box
              width="100%"
              fontSize="2xl"
              alignSelf="center"
              outline="2px solid transparent"
              outlineOffset="2px"
              position="relative"
              border="1px solid white"
              padding-inline="var(--chakra-space-4)"
              height="var(--chakra-sizes-12)"
            >
              {coinFetched &&
                (amount * coin.market_data.current_price.eur).toLocaleString()}
            </Box> */}
            <Input
              placeholder="current price"
              value={coinFetched && amount * coin.market_data.current_price.eur}
              type="number"
              onChange={handleChange}
              size="lg"
            />
          </Box>
          <Box display="flex">
            <Button
              width="40%"
              leftIcon={<MdCall />}
              colorScheme="blue"
              variant="outline"
              onClick={function () {
                buy();
                handleField();
              }}
            >
              Buy
            </Button>
            <Button
              width="60%"
              rightIcon={<MdCall />}
              colorScheme="blue"
              variant="outline"
              onClick={function () {
                sell();
                handleField();
              }}
            >
              Sell
              {/* (Available: {""}
              {holdingSingleProduct
                ? holdingSingleProduct.amount.toLocaleString()
                : 0}
              ) */}
            </Button>
          </Box>
          <Box display="flex">
            <Button
              as="a"
              href="/products"
              rightIcon={
                <GiHedgehog size={30} color="var(--chakra-colors-pink-400)" />
              }
              colorScheme="blue"
              variant="outline"
              width="40%"
            >
              All products
            </Button>
            <Button
              as="a"
              href="/myaccount"
              rightIcon={
                <GiHedgehog size={30} color="var(--chakra-colors-green-300)" />
              }
              colorScheme="blue"
              variant="outline"
              width="60%"
            >
              My Account
            </Button>
          </Box>
          {/* <Text fontSize="2xl" alignSelf="flex-start">
            Total available funds: {totalFunds && totalFunds.toLocaleString()}
          </Text> */}

          {/* <Fade in={isOpen}>
            <Button
              as="a"
              href="/fundings"
              width="100%"
              color="white"
              mt="2"
              colorScheme="pink"
              rounded="md"
              shadow="md"
            >
              Not sufficient amount or funds. Take me to fundings
            </Button>
          </Fade> */}

          {/* <InfoButton alignSelf="center" /> */}
        </Stack>
        <Container color="var(--chakra-colors-gray-300)">
          <Text fontSize="2xl">Recent Trades</Text>
          <SimpleGrid
            templateColumns={{
              base: "1fr 1fr",
              sm: "1fr 1fr 1fr",
              md: "1fr 1fr 1fr",
            }}
            spacing={2}
            py={2}
            alignItems="flex-start"
            justifyContent="center"
          >
            {holdings
              .slice(-5)
              .reverse()
              .map((holding) => (
                <Box
                  key={holding.id}
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  border="white 1px solid"
                  borderRadius="12px"
                  p={2}
                  minW="max-content"
                  minH="100%"
                  fontSize={{ base: "smaller", sm: "lg", md: "1xl" }}
                >
                  <Text fontWeight="bold">{holding.trade}</Text>
                  <Text>{holding.title}</Text>
                  <Text>
                    {Math.abs(holding.amount)} x{" "}
                    {Math.abs(holding.currentPrice).toLocaleString()} ={" "}
                    {Math.abs(holding.price).toLocaleString()}
                  </Text>
                  <Text>{holding.date}</Text>
                </Box>
              ))}
          </SimpleGrid>
        </Container>
      </Center>
    </Container>
  );
}

export default SingleCrypto;
