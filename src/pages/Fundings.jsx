import {
  Input,
  Container,
  Button,
  Center,
  Box,
  Stack,
  Heading,
  Text,
  FormControl,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  useDisclosure,
  Fade,
  Flex,
  FormLabel,
  Spinner,
  TableCaption,
  Link,
  Collapse,
} from "@chakra-ui/react";
import LocalNav from "../components/LocalNav";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { fundingState, fundsTotal } from "../stores/fundings/atom";
import { fundingStatus } from "../stores/fundings/selector";

import { loginState, userState, usersState } from "../stores/users/atom";

function Fundings() {
  // const [users, setUsers] = useRecoilState(usersState);
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [input, setInput] = useState("");

  const { totalFunds } = useRecoilValue(fundingStatus);
  console.log(totalFunds);

  const [fundings, setFundings] = useRecoilState(fundingState);

  useEffect(() => {
    if (currentUser.funds.history) {
      const newFundings = currentUser.funds.history.filter(
        (prevFundings) => !fundings.some((fund) => prevFundings.id === fund.id)
      );
      console.log(newFundings);
      setFundings([...fundings, ...newFundings]);
    }
  }, []);

  console.log(fundings);

  console.log(currentUser);

  useEffect(() => {
    setCurrentUser({
      ...currentUser,
      funds: { history: fundings, total: totalFunds },
    });

    console.log(currentUser);
  }, [fundings]);

  const { isOpen, onToggle } = useDisclosure();

  function handleSubmit(event) {
    event.preventDefault();
  }
  const inputRef = useRef();

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

    if (!fundings) {
      setFundings(newFund);
    } else if (fundings) {
      setFundings((prevFunds) => {
        return [newFund, ...prevFunds];
      });
    }

    setInput("");
  };

  function handleField() {
    inputRef.current.value = null;
  }
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <Container minHeight="100vh" alignItems="flex-start" maxW="100%">
      <LocalNav />
      <Center>
        <Box flex-direction="column">
          <Text
            fontSize={{ base: "2xl", sm: "2xl", md: "2xl" }}
            textColor="gray.500"
          >
            {currentUser.username}
          </Text>
          <Box>
            <Heading
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "2xl", md: "4xl" }}
              lineHeight={"110%"}
              color="gray.300"
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
                    ref={inputRef}
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
                  <Collapse in={isOpen}>
                    <Button
                      as="a"
                      href="/cryptos"
                      color="white"
                      mt="2"
                      colorScheme="pink"
                      rounded="md"
                      shadow="md"
                    >
                      Take me to the hedges
                    </Button>
                  </Collapse>
                </FormControl>
              </form>
              <Container color="gray.300" maxW="100%">
                <Text
                  fontWeight="medium"
                  fontSize={{ base: "2xl", sm: "2xl", md: "3xl" }}
                >
                  Funding history
                </Text>
                <Text
                  color="green.300"
                  fontSize={{ base: "1xl", sm: "2xl", md: "2xl" }}
                  mt={-1}
                >
                  Total available funds:{" "}
                  {(currentUser.funds.total
                    ? currentUser.funds.total
                    : 0
                  ).toLocaleString()}
                </Text>
                <Table variant="simple" size="sm">
                  {/* Todo: Dynamic sizing table  size={{ base: "sm", sm: "md", md: "md" }} */}
                  <Thead>
                    <Tr>
                      <Th>Funding</Th>
                      <Th isNumeric>Time</Th>
                    </Tr>
                  </Thead>
                  {fundings &&
                    fundings.map((funds) => (
                      <Tbody key={funds.id}>
                        <Tr>
                          <Td>{funds.input.toLocaleString()}</Td>
                          <Td isNumeric>{funds.date}</Td>
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
