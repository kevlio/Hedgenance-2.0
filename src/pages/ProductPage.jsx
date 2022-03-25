import React, { useState } from "react";
import { cryptoProductState } from "../stores/products/crypto";
import { energyProductState } from "../stores/products/energy";
import { metalProductState } from "../stores/products/metal";
import { softsProductState } from "../stores/products/softs";

import {
  Container,
  Heading,
  Text,
  Box,
  Button,
  Link,
  CheckboxGroup,
  Checkbox,
  Stack,
  Center,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  SimpleGrid,
} from "@chakra-ui/react";

import { useRecoilValue } from "recoil";
import { loginState } from "../stores/auth/atom";
import AnimatedPage from "../components/AnimatedPage";
import { useNavigate } from "react-router-dom";

function ProductPage() {
  // Varför ska dessa ens finnas i ett State?... -> KK4
  const cryptos = useRecoilValue(cryptoProductState);
  const metals = useRecoilValue(metalProductState);
  const energys = useRecoilValue(energyProductState);
  const softs = useRecoilValue(softsProductState);
  const navigate = useNavigate();
  const logged = useRecoilValue(loginState);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [filters, setFilters] = useState([]);
  const [filtersAll, setFiltersAll] = useState(false);

  const allProducts = cryptos
    .concat(metals, energys, softs)
    .filter((id) => id !== "");

  function handleCheck(event) {
    const name = event.target.name;
    if (!filters.includes(name)) {
      setFilters([...filters, name]);
    }
    if (filters.includes(name)) {
      setFilters(filters.filter((f) => f !== name));
    }
  }

  function handleCheckAll() {
    setFiltersAll(!filtersAll);
    setFilters(allProducts.map((product) => product.category));
    if (filtersAll) {
      setFilters([]);
    }
  }

  const filteredProducts =
    filters.length === 0
      ? allProducts
      : allProducts.filter((product) => filters.includes(product.category));

  return (
    <AnimatedPage>
      <Heading color="var(--chakra-colors-gray-300)">
        Financial Products
      </Heading>
      <Center>
        <CheckboxGroup colorScheme="green">
          <Stack
            my={5}
            spacing={[1, 5]}
            direction={["column", "row"]}
            color="var(--chakra-colors-gray-300)"
          >
            <Checkbox
              name="All"
              onChange={handleCheckAll}
              isChecked={filtersAll}
            >
              Select all
            </Checkbox>
            <Checkbox
              name="Cryptocurrencies"
              onChange={handleCheck}
              isChecked={filters.includes("Cryptocurrencies")}
            >
              Crypto currencies
            </Checkbox>
            <Checkbox
              name="Soft commodities"
              onChange={handleCheck}
              isChecked={filters.includes("Soft commodities")}
            >
              Soft commodities
            </Checkbox>
            <Checkbox
              name="Hard commodities"
              onChange={handleCheck}
              isChecked={filters.includes("Hard commodities")}
            >
              Hard commodities
            </Checkbox>
            <Checkbox
              name="Power"
              onChange={handleCheck}
              isChecked={filters.includes("Power" || "All")}
            >
              Power & Crudes
            </Checkbox>
          </Stack>
        </CheckboxGroup>
      </Center>
      <Container
        minH="100vh"
        as={Stack}
        maxW={"1xl"}
        py={4}
        color="var(--chakra-colors-gray-300)"
      >
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" }}
          spacing={8}
        >
          {filteredProducts.map((product) => (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              textAlign="left"
              key={product.id}
              border="#48BB78 solid 1px"
              borderRadius="14px"
              p={4}
            >
              <Box>
                <Text fontWeight="bold">{product.title}</Text>
                <Text>{product.category}</Text>
                <Text>Current price: ${product.price.toLocaleString()}</Text>
                <Text
                  py={2}
                  borderRadius="12px"
                  height="max-content"
                  fontStyle="oblique"
                >
                  {product.description}
                </Text>
              </Box>
              <Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  gap={2}
                  alignSelf="flex-end"
                >
                  <Button
                    my={1}
                    onClick={
                      !logged
                        ? onOpen
                        : () => {
                            navigate(`/products/${product.id}`);
                          }
                    }
                    colorScheme={"green"}
                    bg={"green.400"}
                    rounded={"lg"}
                    width="100%"
                    px={6}
                    _hover={{
                      bg: "green.500",
                    }}
                  >
                    Buy
                  </Button>
                  <Button
                    my={1}
                    onClick={
                      !logged
                        ? onOpen
                        : () => {
                            navigate(`/products/${product.id}`);
                          }
                    }
                    colorScheme={"green"}
                    bg={"green.400"}
                    rounded={"lg"}
                    width="100%"
                    px={6}
                    _hover={{
                      bg: "green.500",
                    }}
                  >
                    Sell
                  </Button>
                </Box>
                <Button
                  as="a"
                  href={`/products/${product.id}`}
                  my={1}
                  colorScheme={"green"}
                  bg={"green.400"}
                  rounded={"lg"}
                  width="100%"
                  px={6}
                  _hover={{
                    bg: "green.500",
                  }}
                >
                  Add to watchlist
                </Button>
              </Box>
              <Link href={`/products/${product.id}`}>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>
                      Oups! Before you can get started...
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Text>
                        Please Login or Sign up to invest. <br />
                        It only takes 3 minutes to Sign up. Sign up now and get
                        $1000 for trades. Let's hedge.
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
              </Link>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </AnimatedPage>
  );
}

export default ProductPage;
