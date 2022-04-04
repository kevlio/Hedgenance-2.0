import React, { useEffect, useState, useRef } from "react";

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
  Container,
  Stack,
} from "@chakra-ui/react";

import { AiOutlineEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

import { useRecoilState } from "recoil";

import { adminState } from "../stores/users/atom";
import { cryptoState } from "../stores/products/cryptos";
import axios from "axios";

function AdminProducts() {
  const [adminLogged, setAdminLogged] = useState(adminState);
  const [coins, setCoins] = useRecoilState(cryptoState);
  const { isOpen, onToggle } = useDisclosure();
  const [image, setImage] = useState("");

  const [filteredCoins, setFilteredCoins] = useState([]);
  const [search, setSearch] = useState("");

  const [courtage, setCourtage] = useState("");
  // const [edit, setEdit] = useState(false);
  // function editMode() {
  //   setEdit(!edit);
  // }

  const [coinID, setCoinID] = useState("");

  function handleLogged() {
    setAdminLogged(false);
    navigate("/adminlogin");
  }

  useEffect(() => {
    if (search.length === 0) {
      setFilteredCoins(coins);
    }
  }, [search]);

  const searchCrypto = (e) => {
    setSearch(e.target.value);

    const filteredCryptos = coins.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCoins(filteredCryptos);
  };

  // Change this logic
  function updateMode(coinID) {
    setCoinID(coinID);
  }

  const inputRef = useRef();

  function updateProduct() {
    onToggle();
    const updateCoin = coins.filter((coin) => coin.id === coinID);
    const filteredCoins = coins.filter((coin) => coin.id !== coinID);

    if (image) {
      const updatedCoin = updateCoin.map((coin) => {
        return {
          ...coin,
          image: image,
        };
      });

      console.log(updatedCoin);
      setCoinID("");
      setCoins([...updatedCoin, ...filteredCoins]);
      setFilteredCoins([...updatedCoin, ...filteredCoins]);
      inputRef.current.value = null;
    }
  }

  function deleteProduct(coinID) {
    const filteredCoins = coins.filter((coin) => coin.id !== coinID);
    setCoins(filteredCoins);
    setFilteredCoins(filteredCoins);
  }

  useEffect(() => {
    if (coins.length === 0) {
      axios
        .get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        )
        .then((res) => {
          setCoins(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <Center>
      <Container>
        <Stack
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-start"
          my={2}
          spacing={[1, 5]}
          direction={["column", "row"]}
        >
          <Button bg="none" textColor="white" as="a" href="/admin">
            Users Information
          </Button>
          <Button bg="none" textColor="white" as="a" href="/adminproducts">
            Product Information
          </Button>
          <Button bg="none" textColor="white" onClick={handleLogged}>
            Log out admin
          </Button>
        </Stack>
        <FormControl textColor="white" mb={4}>
          <Text
            textTransform="capitalize"
            fontSize={{ base: "1xl", sm: "1xl", md: "2xl" }}
          >
            Updating Coin: {coinID}{" "}
          </Text>
          <Collapse in={!isOpen}>
            <Input
              placeholder="Search Hedge"
              type="text"
              textColor="white"
              onChange={searchCrypto}
              my={1}
            ></Input>
          </Collapse>
          <Box display="flex" flexDirection="column" gap={0} maxW="100%">
            <Input
              my={1}
              type="text"
              placeholder="Change product image"
              textColor="white"
              onChange={(e) => setImage(e.target.value)}
              ref={inputRef}
            />
            <Button
              minWidth="max-content"
              colorScheme="green"
              onClick={updateProduct}
              fontSize={{ base: "md", sm: "lg", md: "1xl" }}
            >
              {coinID ? "Submit Coin Update" : "Choose Coin to Modify"}
            </Button>
          </Box>

          <Collapse in={isOpen}>
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

        {filteredCoins &&
          filteredCoins.map((coin) => (
            <Box
              key={coin.id}
              border="#48BB78 solid 2px"
              my={2}
              borderRadius="14px"
            >
              <Box
                maxW="100%"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                textAlign="left"
                borderRadius="14px"
                p={2}
                // whiteSpace="nowrap"
                // gap={10}
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  gap={1}
                  alignItems="center"
                >
                  <Image boxSize={10} src={coin.image}></Image>
                  <Text
                    fontSize="1xl"
                    fontWeight="bold"
                    color={"green.400"}
                    textColor={coin.id === coinID ? "blue.400" : "white"}
                  >
                    {" "}
                    {coin.name}
                  </Text>
                </Box>

                <Box
                  display="flex"
                  flexDirection="row"
                  gap={1}
                  alignItems="center"
                >
                  <Button
                    fontWeight="bold"
                    colorScheme="red"
                    onClick={() => deleteProduct(coin.id)}
                  >
                    <AiFillDelete />
                  </Button>
                  <Button
                    fontWeight="bold"
                    colorScheme="green"
                    onClick={function () {
                      updateMode(coin.id);
                      onToggle();
                    }}
                  >
                    <AiOutlineEdit />
                  </Button>
                </Box>
              </Box>
              {/* <FormControl isDisabled={!edit} onClick={editMode}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  textColor="white"
                >
                  <Text minW="min-content">Current Courtage: 0,15%</Text>

                  <Input
                    type="text"
                    placeholder="Change Courtage %"
                    onChange={(e) => setCourtage(e.target.value)}
                  />
                </Box>
              </FormControl> */}
            </Box>
          ))}
      </Container>
    </Center>
  );
}

export default AdminProducts;
