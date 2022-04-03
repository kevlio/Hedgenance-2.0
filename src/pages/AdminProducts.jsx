import React from "react";
import {
  cryptoState,
  singleCryptoState,
  watchCryptoState,
} from "../stores/products/cryptos";
import { useRecoilState } from "recoil";
import axios from "axios";

import {
  Center,
  Container,
  Box,
  SimpleGrid,
  Text,
  Checkbox,
  Stack,
  CheckboxGroup,
  List,
  ListItem,
  ListIcon,
  Button,
} from "@chakra-ui/react";

import { AiOutlineEdit } from "react-icons/ai";

function AdminProducts() {
  const [coins, setCoins] = useRecoilState(cryptoState);

  if (coins.length === 0) {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }

  console.log(coins);
  return (
    <Box>
      {/* <Text textColor="green.400">
      EDIT/ADD PRODUCTS. - En admin ska kunna uppdatera och ta bort en produkt i
      admin-panelen. FRÅGA: FRÅN EN PROFIL ELLER FRÅN CRYPTOSTATES?
    </Text> */}
      {coins &&
        coins.map((coin) => (
          <Box
            key={coin.id}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            textAlign="left"
            border="#48BB78 solid 1px"
            borderRadius="14px"
            p={4}
            textColor="white"
            whiteSpace="nowrap"
          >
            <Text fontSize="2xl" fontWeight="bold" color={"green.400"}>
              {" "}
              {coin.name}
            </Text>
            <AiOutlineEdit size={60} />
          </Box>
        ))}
    </Box>
  );
}

export default AdminProducts;
