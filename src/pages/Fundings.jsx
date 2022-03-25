import {
  Input,
  Container,
  Button,
  Center,
  Box,
  Stack,
  Heading,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Link,
  useDisclosure,
  Fade,
} from "@chakra-ui/react";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { fundingState } from "../stores/fundings/atom";
import { fundingStatus } from "../stores/fundings/selector";
import LocalNav from "../components/LocalNav";

function Fundings() {
  const [input, setInput] = useState("");
  const [fundings, setFundings] = useRecoilState(fundingState);
  const { totalFunds } = useRecoilValue(fundingStatus);

  const { isOpen, onToggle } = useDisclosure();

  function handleSubmit(event) {
    event.preventDefault();
  }
  const todoRef = useRef();

  const createFunding = () => {
    if (input <= 0) return;

    let date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const sec = String(date.getSeconds()).padStart(2, "0");

    date = `${yyyy}-${mm}-${dd} ${hour}:${min}:${sec}`;

    const newFund = {
      input: parseInt(input),
      date: date,
      id: Math.floor(Math.random() * 10000),
    };
    setFundings((prevFunds) => {
      return [newFund, ...prevFunds];
    });
    setInput("");
  };

  function handleField() {
    todoRef.current.value = null;
  }
  useEffect(() => {
    todoRef.current.focus();
  });

  return (
    <Container minHeight="100vh" alignItems="flex-start" maxW="100%">
      <LocalNav />
      <Center>
        <Box flex-direction="column">
          <Box>
            <Heading
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "2xl", md: "4xl" }}
              lineHeight={"110%"}
              color={"var(--chakra-colors-gray-300)"}
              padding={2}
            >
              Insert fundings <br />
              <Text as={"span"} color={"green.400"}>
                via Paypal, VISA or Coinbase
              </Text>
            </Heading>
          </Box>
          <Box>
            <Stack px={10} maxW="100%">
              <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                  <Input
                    ref={todoRef}
                    maxW="100%"
                    autoComplete="off"
                    color={"green.400"}
                    name="funding"
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Insert desired amount"
                    type="number"
                    mb={1}
                  ></Input>

                  <Button
                    type="submit"
                    width="100%"
                    onClick={function () {
                      createFunding();
                      handleField();
                      onToggle();
                    }}
                    colorScheme={"green"}
                    bg={"green.400"}
                    px={6}
                    _hover={{
                      bg: "green.500",
                    }}
                  >
                    Insert funds
                  </Button>
                  <Fade in={isOpen}>
                    <Button
                      as="a"
                      href="/products"
                      color="white"
                      mt="2"
                      colorScheme="pink"
                      rounded="md"
                      shadow="md"
                    >
                      Take me to the hedges
                    </Button>
                  </Fade>
                </FormControl>
              </form>
              <Container color="var(--chakra-colors-gray-300)" maxW="100%">
                <Text fontSize="3xl">Funding history</Text>
                <Text fontSize="2xl" color="var(--chakra-colors-gray-400)">
                  Total available funds:{" "}
                  {totalFunds && totalFunds.toLocaleString()} USD
                </Text>
                <Table variant="simple" size="sm">
                  {/* Todo: Dynamic sizing table  size={{ base: "sm", sm: "md", md: "md" }} */}
                  <Thead>
                    <Tr>
                      <Th>Funding</Th>
                      <Th isNumeric>Time</Th>
                    </Tr>
                  </Thead>
                  {fundings.map((funding) => (
                    <Tbody key={funding.id}>
                      <Tr>
                        <Td>{funding.input.toLocaleString()}</Td>
                        <Td isNumeric>{funding.date}</Td>
                      </Tr>
                    </Tbody>
                  ))}
                  <Tfoot>
                    <Tr>
                      <Th>Funding</Th>
                      <Th isNumeric>Time</Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </Container>
            </Stack>
          </Box>
        </Box>
      </Center>
    </Container>
  );
}

export default Fundings;
