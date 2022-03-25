import React, { useState, useRef, useEffect } from "react";
import InfoButton from "../components/InfoButton";

import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { cryptoProductState } from "../stores/products/crypto";
import { energyProductState } from "../stores/products/energy";
import { metalProductState } from "../stores/products/metal";
import { softsProductState } from "../stores/products/softs";
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
} from "@chakra-ui/react";
import { MdCall } from "react-icons/md";
import { productHoldingStatus } from "../stores/holdings/selector";

function SingleProduct() {
  const params = useParams();
  const cryptos = useRecoilValue(cryptoProductState);
  const metals = useRecoilValue(metalProductState);
  const energys = useRecoilValue(energyProductState);
  const softs = useRecoilValue(softsProductState);

  const [holdings, setHoldings] = useRecoilState(holdingState);
  const [amount, setAmount] = useState("");
  const { totalFunds } = useRecoilValue(fundingStatus);
  const [fundings, setFundings] = useRecoilState(fundingState);

  const { productStore } = useRecoilValue(productHoldingStatus);

  const allProducts = cryptos
    .concat(metals, energys, softs)
    .filter((id) => id !== "");

  useEffect(() => {
    inputRef.current.focus();
  });

  function handleChange(event) {
    const value = event.target.value;
    props.setInput(value);
  }

  const inputRef = useRef();

  function handleField() {
    inputRef.current.value = null;
  }
  const products = allProducts.find(
    (product) => product.id === parseInt(params.id)
  );

  const holdingSingleProduct = productStore.find(
    (holding) => holding.title === products.title
  );

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
    console.log(products.price);

    if (amount <= 0 || totalFunds < products.price * amount) return;

    // Alert funds not available
    const newBuy = {
      title: products.title,
      category: products.category,
      currentPrice: products.price,
      trade: "buy",
      price: products.price * amount,
      amount: +amount,
      date: date,
      id: Math.floor(Math.random() * 10000),
    };
    setHoldings((prevBuy) => {
      return [...prevBuy, newBuy];
    });
    const reduceFunds = {
      input: -products.price * amount,
      date: date,
      id: Math.floor(Math.random() * 10000),
    };
    setFundings((prevFunds) => {
      return [...prevFunds, reduceFunds];
    });
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
            boxSize="400px"
            objectFit="cover"
            src={products.image}
            alt=""
          />
          <Text>
            {products.title}, {products.category}
          </Text>
          <Text>{products.description}</Text>
          <Text>${products.price.toLocaleString()}</Text>
          {/* <Input type="range" onChange={handleChange} size="lg" /> */}
          <Input
            ref={inputRef}
            placeholder="amount"
            type="number"
            onChange={handleChange}
            size="lg"
          />

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
              Sell (Available: {""}
              {holdingSingleProduct
                ? holdingSingleProduct.amount.toLocaleString()
                : 0}
              )
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
          <Text fontSize="2xl" alignSelf="flex-start">
            Total available funds: {totalFunds && totalFunds.toLocaleString()}
          </Text>

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

export default SingleProduct;
