import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  Suspense,
} from "react";

import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

import { holdingState } from "../stores/holdings/atom";

import { fundingState } from "../stores/fundings/atom";
import { fundingStatus } from "../stores/fundings/selector";

import { holdingStatus } from "../stores/holdings/selector";

import {
  Box,
  Text,
  Button,
  Center,
  Input,
  Image,
  Container,
  SimpleGrid,
  useDisclosure,
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Link,
} from "@chakra-ui/react";
import { MdCall, MdOutlineOpenInBrowser } from "react-icons/md";
import { productHoldingStatus } from "../stores/holdings/selector";

import { cryptoState, singleCryptoState } from "../stores/products/cryptos";
import axios from "axios";
import { loginState, userState } from "../stores/users/atom";

function SingleFetchedProduct() {
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const [show, setShow] = React.useState(false);

  const [orderMode, setOrderMode] = useState("");

  const [currentUser, setCurrentUser] = useRecoilState(userState);

  const logged = useRecoilValue(loginState);

  const handleToggle = () => setShow(!show);

  const [coin, setCoin] = useRecoilState(singleCryptoState);
  const [amount, setAmount] = useState("");
  const [amountMax, setAmountMax] = useState(0);

  const { totalFunds } = useRecoilValue(fundingStatus);

  const { totalHolding } = useRecoilValue(holdingStatus);

  const [holdings, setHoldings] = useRecoilState(holdingState);
  const [fundings, setFundings] = useRecoilState(fundingState);

  const coinData = {
    name: coin.name,
    price: coin.market_data.current_price.eur,
    change: coin.market_data.price_change_percentage_24h.toFixed(2),
    image: coin.image.large,
    id: coin.id,
    rank: coin.coingecko_rank,
    categories: coin.categories,
    ath: coin.market_data.ath.eur,
    atl: coin.market_data.atl.eur,
    ath_date: coin.market_data.ath_date.eur,
    atl_date: coin.market_data.atl_date.eur,
    high_24: coin.market_data.high_24h.eur,
    low_24: coin.market_data.low_24h.eur,
    updated: coin.market_data.last_updated.replace(/[T_Z]/g, " ").slice(0, -5),
    mcap: coin.market_data.market_cap.eur,
    mcap_rank: coin.market_data.market_cap_rank,
  };

  const { productStore } = useRecoilValue(productHoldingStatus);

  const holdingSingleProduct = productStore.find(
    (holding) => holding.title === coinData.name
  );

  console.log(holdingSingleProduct);

  function handleChange(event) {
    const value = event.target.value;
    setAmount(value);
    console.log(amount);
  }

  // Definiera alla coins etc så vi kan återanvända dom direkt.
  // Ändra mins eller plus tecken beroende på buy sell mode

  // Maybe put these together. med event.target.value
  function selectedMode(e) {
    const mode = e.target.value;
    setOrderMode(mode);
    if (!logged) {
      onOpen();
    }
  }

  function maxAmount() {
    if (orderMode === "buy") {
      const maxBuy = Math.floor(totalFunds / coinData.price);
      console.log(maxBuy);
      setAmountMax(maxBuy);
    }
    if (orderMode === "sell") {
      const maxSell = holdingSingleProduct.amount;
      console.log(maxSell);
      setAmountMax(maxSell);
    }
  }

  function placeOrder() {
    if (orderMode === "buy") {
      buy();
    }
    if (orderMode === "sell") {
      sell();
    }
  }
  let date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const sec = String(date.getSeconds()).padStart(2, "0");

  date = `${yyyy}-${mm}-${dd} ${hour}:${min}:${sec}`;
  // Maybe put these together
  const buy = () => {
    console.log(coin.market_data.current_price.eur * amount);

    const buyingConditions =
      amount <= 0 || totalFunds < coin.market_data.current_price.eur * amount;

    if (buyingConditions) {
      onToggle();
    }

    if (amount <= 0 || totalFunds < coin.market_data.current_price.eur * amount)
      return;

    // Alert funds not available
    const newBuy = {
      title: coinData.name,
      category: "Cryptocurrencies",
      currentPrice: coinData.price,
      trade: "buy",
      price: coinData.price * amount,
      amount: +amount,
      // borde kunna ändra amount +- vid buy sell state
      date: date,
      id: Math.floor(Math.random() * 10000),
      coinID: coinData.id,
    };
    setHoldings((prevBuy) => {
      return [...prevBuy, newBuy];
    });
    const reduceFunds = {
      input: -coinData.price * amount,
      date: date,
      id: Math.floor(Math.random() * 10000),
    };
    setFundings((prevFunds) => {
      return [...prevFunds, reduceFunds];
    });
    console.log(holdings);
    console.log(fundings);
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
    console.log(fundings);
  };

  const sell = () => {
    const sellingConditions =
      amount <= 0 ||
      !holdingSingleProduct ||
      holdingSingleProduct.amount <= 0 ||
      holdingSingleProduct.amount < amount;

    if (sellingConditions) {
      onToggle();
    }
    if (sellingConditions) return;

    // Alert not sufficient amount
    const newSell = {
      title: coin.name,
      category: "Cryptocurrencies",
      currentPrice: coinData.price,
      trade: "sell",
      price: -coinData.price * amount,
      amount: -amount,
      date: date,
      id: Math.floor(Math.random() * 10000),
    };
    setHoldings((prevSell) => {
      return [...prevSell, newSell];
    });
    const increaseFunds = {
      input: +coinData.price * amount,
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
      holdings: {
        history: holdings,
        total: totalHolding,
      },
    });
    console.log(fundings);
  };

  function handleChange(event) {
    const value = event.target.value;
    setAmount(value);
  }

  if (!coin) {
    return <p>Loading profile...</p>;
  }

  console.log(amountMax);

  useEffect(() => {
    inputRef.current.focus();
  });

  const inputRef = useRef();

  function handleField() {
    inputRef.current.value = null;
  }

  return (
    <Center>
      <SimpleGrid
        textColor="white"
        templateColumns={{
          base: "1fr",
          sm: "1fr 1fr",
          md: "1fr 1fr",
          lg: "1fr 1fr",
        }}
        spacing={4}
        gap={4}
        py={2}
      >
        <Box
          display="flex"
          justifyContent="flex-start"
          flexDirection="column"
          alignItems="center"
          ml="120px"
          mr="60px"
        >
          <Image src={coinData.image} boxSize="100px" alignSelf="center" />
          <Box>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color={"green.400"}
              alignSelf="flex-start"
            >
              {coinData.name}
            </Text>
            <Text>Coin rank: {coinData.rank}</Text>
          </Box>
          <Box display="flex" flexDirection="column">
            {coinData.categories.map((category) => (
              <List key={category}>
                <ListItem fontSize="smaller">{category}</ListItem>
              </List>
            ))}
          </Box>
        </Box>
        <Box display="flex" flexDirection="row">
          <Image src="https://assets.coinbase.com/exchange/assets/pro-trading-viewbc7481fccd81a9210688b5f0ca42fde5.png"></Image>
        </Box>
        <Box>
          <Button
            as="a"
            href="/cryptos"
            width="200px"
            ml="130px"
            mr="50px"
            colorScheme="green"
            bg="none"
            variant="outline"
            value="buy"
            textColor="white"
          >
            All products
          </Button>
          <Button
            as="a"
            href="/myaccount"
            width="200px"
            mt={1}
            ml="130px"
            mr="50px"
            colorScheme="green"
            bg="none"
            variant="outline"
            value="buy"
            textColor="white"
          >
            My Account
          </Button>
          <Box display="flex" flexDirection="column">
            <Text ml="130px" mr="50px">
              Available funds: €{totalFunds.toLocaleString()}
            </Text>

            <Box display="flex" flexDirection="row" ml="130px">
              <Button
                width="100px"
                rightIcon={<MdCall />}
                colorScheme="green"
                variant="outline"
                value="buy"
                onClick={selectedMode}
                bg={orderMode === "buy" ? "green.500" : "none"}
                textColor="white"
              >
                Buy
              </Button>
              <Button
                width="100px"
                rightIcon={<MdCall />}
                colorScheme="blue"
                variant="outline"
                value="sell"
                onClick={selectedMode}
                bg={orderMode === "sell" ? "green.500" : "none"}
                textColor="white"
              >
                Sell
              </Button>
            </Box>
          </Box>
          <Box display="flex">
            <Button
              colorScheme="green"
              bg="none"
              width="130px"
              onClick={maxAmount}
            >
              Max amount
            </Button>
            <Input
              ref={inputRef}
              placeholder="amount"
              type="number"
              onChange={handleChange}
              maxW="200px"
              defaultValue={amountMax ? amountMax : null}
            />
          </Box>
          <Box display="flex">
            <Button colorScheme="green" bg="none" width="130px">
              Current price
            </Button>
            <Input defaultValue={coinData.price} maxW="200px" />
          </Box>
          {/* To next project update */}
          {/* <Box display="flex">
            <Button colorScheme="green" bg="none" width="130px">
              Desired price
            </Button>
            <Input defaultValue={coinData.price} maxW="200px" />
          </Box> */}
          <Box display="flex">
            <Button colorScheme="green" bg="none" width="130px">
              Total price
            </Button>
            <Input
              maxW="200px"
              placeholder="amount x price"
              defaultValue={amount && amount * coinData.price}
            />
          </Box>

          <Button
            colorScheme="green"
            ml="130px"
            mr="50px"
            width="200px"
            mt={1}
            onClick={function () {
              placeOrder();
              handleField();
            }}
          >
            Place order
          </Button>
          <Collapse in={logged && isOpen}>
            <Button
              bg="red"
              ml="130px"
              mr="50px"
              mt={1}
              width="200px"
              marginY={1}
              as="a"
              href="/myaccount"
            >
              !Sufficient funds/amount
            </Button>
          </Collapse>

          <Button
            colorScheme="green"
            onClick={handleToggle}
            ml="130px"
            mr="50px"
            mt={1}
            width="200px"
            bg={show ? "green.400" : "none"}
            variant="outline"
            color="white"
          >
            {show ? "Hide" : "More"} information
          </Button>
          <Collapse startingHeight={0} in={show}>
            <Text width="200px" ml="130px" mt={1}>
              {coin.description.en}
            </Text>
          </Collapse>
        </Box>

        {/* <Collapse startingHeight={200} in={show}> */}
        <Table variant="simple" size="sm" whiteSpace="nowrap">
          {/* Todo: Dynamic sizing table  size={{ base: "sm", sm: "md", md: "md" }} */}
          <Thead>
            <Tr>
              <Th>{coinData.updated}</Th>
              <Th isNumeric>EUR</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Total value</Td>
              <Td isNumeric>
                {holdingSingleProduct &&
                  (holdingSingleProduct.value > 0
                    ? holdingSingleProduct.value.toFixed(2)
                    : holdingSingleProduct.value.toFixed(5))}
              </Td>
            </Tr>
          </Tbody>
          <Tbody>
            <Tr>
              <Td>Avg. purchase price</Td>
              <Td isNumeric>
                {holdingSingleProduct &&
                  (holdingSingleProduct.value / holdingSingleProduct.amount > 0
                    ? (
                        holdingSingleProduct.value / holdingSingleProduct.amount
                      ).toFixed(2)
                    : (
                        holdingSingleProduct.value / holdingSingleProduct.amount
                      ).toFixed(5))}
              </Td>
            </Tr>
          </Tbody>
          <Tbody>
            <Tr>
              <Td>Holding Amount</Td>
              <Td isNumeric>
                {holdingSingleProduct && holdingSingleProduct.amount}
              </Td>
            </Tr>
          </Tbody>
          <Tbody>
            <Tr>
              <Td>Value change %</Td>
              <Td isNumeric>
                {holdingSingleProduct &&
                  (
                    1 -
                    holdingSingleProduct.value /
                      (coinData.price * holdingSingleProduct.amount)
                  ).toFixed(5)}
              </Td>
            </Tr>
          </Tbody>
          <Tbody>
            <Tr>
              <Td>Value change</Td>
              <Td isNumeric>
                {holdingSingleProduct &&
                  (
                    holdingSingleProduct.value -
                    coinData.price * holdingSingleProduct.amount
                  ).toLocaleString()}
              </Td>
            </Tr>
          </Tbody>

          <Tbody>
            <Tr>
              <Td>Current</Td>
              <Td isNumeric>{coinData.price.toLocaleString()}</Td>
            </Tr>
          </Tbody>
          <Tbody>
            <Tr>
              <Td>Change 24h</Td>
              <Td isNumeric>{coinData.change}%</Td>
            </Tr>
          </Tbody>
          <Tbody>
            <Tr>
              <Td>High 24h:</Td>
              <Td isNumeric>{coinData.high_24.toLocaleString()}</Td>
            </Tr>
          </Tbody>
          <Tbody>
            <Tr>
              <Td>Low 24h</Td>
              <Td isNumeric>{coinData.low_24.toLocaleString()}</Td>
            </Tr>
          </Tbody>
          <Tbody>
            <Tr>
              <Td>ATH {coinData.ath_date.slice(0, -14)}</Td>
              <Td isNumeric>{coinData.ath.toLocaleString()}</Td>
            </Tr>
          </Tbody>
          <Tbody>
            <Tr>
              <Td>ATL {coinData.atl_date.slice(0, -14)}</Td>
              <Td isNumeric>{coinData.atl.toLocaleString()}</Td>
            </Tr>
          </Tbody>

          <Tfoot>
            <Tr>
              <Th></Th>
              <Th isNumeric> </Th>
            </Tr>
          </Tfoot>
        </Table>
        {/* </Collapse> */}
      </SimpleGrid>
      <Modal isOpen={!logged && isOpen} onClose={!logged && onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Oups! Before you can get started...</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Please Login or Sign up to invest. <br />
              It only takes 3 minutes to Sign up. Sign up now and get $1000 for
              trades. Let's hedge.
            </Text>
          </ModalBody>
          <ModalFooter gap={1}>
            <Link href="/login">
              <Button colorScheme="green">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button colorScheme="green">Sign up</Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
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
