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
import { fundingState, fundsTotal } from "../stores/fundings/atom";
import { fundingStatus } from "../stores/fundings/selector";
import LocalNav from "../components/LocalNav";

import {
  loginState,
  userState,
  usersState,
  currentIDState,
} from "../stores/auth/atom";

function Fundings() {
  const [users, setUsers] = useRecoilState(usersState);
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [input, setInput] = useState("");
  const currentUserID = useRecoilValue(currentIDState);
  // Moves this to users LocalStorage instead
  // const [fundings, setFundings] = useRecoilState(fundingState);
  // const { totalFunds } = useRecoilValue(fundingStatus);
  const [fundings, setFundings] = useState([]);
  const [userHistoryFunds, setUserHistoryFunds] = useState([]);
  const [userTotalFunds, setUserTotalFunds] = useState(0);

  console.log(fundings);

  console.log(currentUser);

  // Skulle vara användbart att sätta CurrentUser till user en gång, till andra sidor...

  // const user = users.filter((user) => user.id === currentUser.id);
  // console.log(user);
  // console.log(user[0].funds);

  // useEffect(() => {
  //   if (user[0].funds.total) setFundings(user[0].funds.history);
  // }, []);

  const totalFunds =
    fundings &&
    fundings.reduce((total, current) => {
      const formattedAmount = parseInt(current.input);
      return total + formattedAmount;
    }, 0);

  console.log(totalFunds);

  useEffect(() => {
    console.log(totalFunds);
    setUserHistoryFunds(fundings);
    setUserTotalFunds(totalFunds);
    setUsers(
      users.map((user) => {
        if (user.id === currentUserID) {
          return {
            ...user,
            funds: { history: fundings, total: totalFunds },
          };
        }
        return user;
      })
    );
    const user = users.filter((user) => user.id === currentUserID);

    setCurrentUser({
      ...currentUser,
      funds: { history: fundings, total: totalFunds },
    });

    console.log(currentUser);
    console.log(user);
    console.log(user[0]);
  }, [fundings]);

  const { isOpen, onToggle } = useDisclosure();

  function handleSubmit(event) {
    event.preventDefault();
  }
  const todoRef = useRef();

  // console.log(currentUser);
  console.log(users);

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
          <Text textColor="white">{currentUser.username}</Text>
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
                      href="/crypto"
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
              <Container color="gray.300" maxW="100%">
                <Text fontSize="3xl">Funding history</Text>
                <Text fontSize="2xl" color="gray.400">
                  Total available funds:{" "}
                  {/* {user[0].funds && user[0].funds.total.toLocaleString()} USD */}
                  {/* {totalFundsUser && totalFundsUser.toLocaleString()} */}
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
                  {userHistoryFunds &&
                    userHistoryFunds.map((funds) => (
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
