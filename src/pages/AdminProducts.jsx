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

import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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
          <Button
            as="a"
            href="/admin"
            colorScheme="black"
            _hover={{ bg: "green.400" }}
          >
            User Information
          </Button>
          <Button
            as="a"
            href="/adminproducts"
            colorScheme="black"
            _hover={{ bg: "green.400" }}
          >
            Product Information
          </Button>
          <Button
            onClick={handleLogged}
            colorScheme="black"
            _hover={{ bg: "green.400" }}
          >
            Log out admin
          </Button>
        </Stack>
        <FormControl textColor="white" mt={4}>
          <Text
            textTransform="capitalize"
            fontSize={{ base: "1xl", sm: "1xl", md: "2xl" }}
          >
            {isOpen ? ` Updating: ${coinID}` : ""}
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
            <Collapse in={isOpen}>
              <Input
                my={1}
                type="text"
                placeholder="Change product image"
                textColor="white"
                onChange={(e) => setImage(e.target.value)}
                ref={inputRef}
              />
            </Collapse>
            <Button
              minWidth="max-content"
              colorScheme="green"
              onClick={updateProduct}
              fontSize={{ base: "md", sm: "lg", md: "1xl" }}
            >
              {isOpen ? "Submit Coin Update" : "Choose Coin to Modify"}
            </Button>
          </Box>
          <Collapse in={isOpen}>
            <Text>URL Suggestions:</Text>
            <Input
              type="url"
              placeholder="URL suggestion"
              defaultValue="https://i0.wp.com/www.wjbf.com/wp-content/uploads/sites/47/2019/11/Kanye-West.png?w=2000&ssl=1"
              textColor="green.200"
            />{" "}
            <Input
              type="url"
              placeholder="URL suggestion"
              defaultValue="https://c8.alamy.com/zooms/9/822a00bfc0ed4cfe8974c7e1acff656f/t17e90.jpg"
              textColor="green.200"
            />{" "}
            <Input
              type="url"
              placeholder="URL suggestion"
              defaultValue="https://ichef.bbci.co.uk/news/976/cpsprodpb/7727/production/_103330503_musk3.jpg"
              textColor="green.200"
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
                  <Image
                    boxSize={16}
                    borderRadius="12px"
                    src={coin.image}
                    objectFit="cover"
                  ></Image>
                  <Text
                    fontSize="1xl"
                    fontWeight="bold"
                    color={"green.400"}
                    textColor={
                      coin.id === coinID && isOpen ? "blue.400" : "white"
                    }
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
