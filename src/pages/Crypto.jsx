import React, { useState, useEffect } from "react";
import axios from "axios";
import { cryptoState, singleCryptoState } from "../stores/products/cryptos";
import { useRecoilState } from "recoil";
import {
  Center,
  Container,
  Box,
  Text,
  Image,
  SimpleGrid,
  Checkbox,
  Stack,
  CheckboxGroup,
  Button,
} from "@chakra-ui/react";

import { useParams, useNavigate } from "react-router-dom";

function Crypto() {
  // https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false
  const params = useParams();
  const navigate = useNavigate();
  const [coins, setCoins] = useRecoilState(cryptoState);
  const [coin, setCoin] = useRecoilState(singleCryptoState);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const cryptoById = (coin) => {
    //   useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${coin}`)
      .then((res) => {
        setCoin(res.data);
        console.log(res.data);
        navigate(`/crypto/${coin}`);
      })
      .catch((error) => console.log(error));
    //   }, []);
  };

  return (
    <Center flexDirection="column">
      <CheckboxGroup colorScheme="green">
        <Stack
          my={5}
          spacing={[1, 5]}
          direction={["column", "row"]}
          color="var(--chakra-colors-gray-300)"
        >
          {/* <Checkbox name="All">
            onChange={handleCheckAll} isChecked={filtersAll}
            Select all
          </Checkbox> */}
          <Checkbox
            name="Cryptocurrencies"
            // onChange={handleCheck}
            // isChecked={filters.includes("Cryptocurrencies")}
          >
            EUR | Sort by Crypto ranking
          </Checkbox>
          <Checkbox
            name="Soft commodities"
            // onChange={handleCheck}
            // isChecked={filters.includes("Soft commodities")}
          >
            USD
          </Checkbox>
        </Stack>
      </CheckboxGroup>

      <SimpleGrid
        templateColumns={{ sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" }}
        spacing={8}
      >
        {coins &&
          coins.map((coin) => (
            <Box
              key={coin.id}
              // display="flex"
              // alignItems="center"
              // justifyContent="space-between"
              textColor="white"
              border="1px white solid"
              borderRadius="24px"
              p={2}
              alignItems="center"
              justifyContent="center"
            >
              <Box alignItems="center" justifyContent="center">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Image
                    src={coin.image}
                    boxSize="50px"
                    alignSelf="center"
                  ></Image>
                  <Text fontSize="2xl" fontWeight="bold" color={"green.400"}>
                    {" "}
                    {coin.name}
                  </Text>

                  <Box
                    display="flex"
                    gap="12px"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Text>{coin.price_change_percentage_24h.toFixed(2)}%</Text>
                    <Text>{coin.current_price.toLocaleString()} </Text>
                  </Box>
                </Box>

                <Box display="flex" alignSelf="flex-end" gap="12px">
                  <Text>High: {coin.high_24h.toLocaleString()}€</Text>
                  <Text>Low: {coin.low_24h.toLocaleString()}€</Text>
                </Box>
                <Text alignSelf="flex-start">
                  {coin.last_updated.replace(/[T_Z]/g, " ").slice(0, -5)}
                </Text>
                <Button
                  onClick={(e) => cryptoById(e.target.value)}
                  value={coin.id}
                  colorScheme="green"
                  width="100%"
                  alignSelf="center"
                >
                  Trade
                </Button>
              </Box>
            </Box>
          ))}
      </SimpleGrid>
    </Center>
  );
}

export default Crypto;
