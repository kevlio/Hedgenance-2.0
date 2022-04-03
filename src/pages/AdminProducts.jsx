import React, { useEffect, useState } from "react";
import { cryptoState } from "../stores/products/cryptos";
import { useRecoilState } from "recoil";
import axios from "axios";

import {
  Box,
  Text,
  Button,
  useDisclosure,
  Fade,
  Collapse,
  Input,
  FormControl,
  Image,
  Center,
} from "@chakra-ui/react";

import { AiOutlineEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

function AdminProducts() {
  const [coins, setCoins] = useRecoilState(cryptoState);
  const { isOpen, onToggle } = useDisclosure();
  const [image, setImage] = useState("");
  const [coinID, setCoinID] = useState("");

  // Varför emittar den coinID så dåligt? Fråga Oscar

  function updateMode(coinID) {
    console.log(coinID);
    setCoinID(coinID);
    onToggle();
  }

  function updateProduct() {
    console.log(coinID);
    console.log(image);
    const updateCoin = coins.filter((coin) => coin.id === coinID);
    const filteredCoins = coins.filter((coin) => coin.id !== coinID);
    console.log(updateCoin);
    console.log(filteredCoins);

    if (coinID && image) {
      const updatedCoin = updateCoin.map((coin) => {
        return {
          ...coin,
          image: image,
        };
      });

      console.log(updatedCoin);
      setCoinID("");
      setCoins([...updatedCoin, ...filteredCoins]);
    }
  }

  function deleteProduct(coinID) {
    if (coinID) {
      console.log(coinID);
      const filteredCoins = coins.filter((coin) => coin.id !== coinID);
      setCoins(filteredCoins);
    }
  }

  useEffect(() => {
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
  }, []);

  return (
    <Center>
      <Box>
        <FormControl textColor="white" mb={4}>
          <Text textTransform="capitalize" fontSize="2xl">
            Updating: {coinID}{" "}
          </Text>
          <Box display="flex" flexDirection="row" gap={2}>
            <Input
              type="text"
              // defaultValue={coin.image}
              placeholder="Change product image"
              textColor="white"
              onChange={(e) => setImage(e.target.value)}
            />
            <Button width="40%" colorScheme="green" onClick={updateProduct}>
              {coinID ? "Submit Coin Update" : "Choose Coin to Modify"}
            </Button>
          </Box>

          <Collapse in={coinID && isOpen}>
            <Text>URL Sugestions</Text>
            <Input
              type="url"
              placeholder="URL suggestion"
              defaultValue="https://i0.wp.com/www.wjbf.com/wp-content/uploads/sites/47/2019/11/Kanye-West.png?w=2000&ssl=1"
              textColor="white"
            />{" "}
            <Input
              type="url"
              placeholder="URL suggestion"
              defaultValue="https://i0.wp.com/s1.favim.com/orig/23/animal-aww-awww-cat-cute-Favim.com-215286.jpg"
              textColor="white"
            />
            <Input
              type="url"
              placeholder="URL suggestion"
              defaultValue="https://images.aftonbladet-cdn.se/v2/images/baa7fae4-fdc0-4480-b873-79fb8b7fdbf5?fit=crop&format=auto&h=1327&q=50&w=1900&s=31f4ea1ef964d8260047b4cbd748993102acd69a"
              textColor="white"
            />{" "}
          </Collapse>
        </FormControl>

        {coins &&
          coins.map((coin) => (
            <Box key={coin.id}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                textAlign="left"
                border="#48BB78 solid 1px"
                borderRadius="14px"
                p={4}
                whiteSpace="nowrap"
              >
                <Box display="flex" flexDirection="row" gap={2}>
                  <Image boxSize={10} src={coin.image}></Image>
                  <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    color={"green.400"}
                    textColor={coin.id === coinID ? "blue.400" : "white"}
                  >
                    {" "}
                    {coin.name}
                  </Text>
                </Box>
                <Box display="flex" flexDirection="row" gap={2}>
                  <Button
                    fontSize="2xl"
                    fontWeight="bold"
                    colorScheme="red"
                    onClick={(e) => deleteProduct(e.target.value)}
                    value={coin.id}
                    rightIcon={<AiFillDelete />}
                  ></Button>
                  <Button
                    fontSize="2xl"
                    fontWeight="bold"
                    colorScheme="green"
                    value={coin.id}
                    onClick={(e) => updateMode(e.target.value)}
                    rightIcon={<AiOutlineEdit />}
                  ></Button>
                </Box>
              </Box>
            </Box>
          ))}
      </Box>
    </Center>
  );
}

export default AdminProducts;
