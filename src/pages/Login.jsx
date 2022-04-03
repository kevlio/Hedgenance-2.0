import {
  Input,
  Button,
  Center,
  Box,
  Stack,
  Heading,
  Text,
  FormControl,
  Fade,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useEffect, useState } from "react";
import AnimatedPage from "../components/AnimatedPage";
import { Link, useNavigate } from "react-router-dom";
import { loginState, userState, usersState } from "../stores/users/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { holdingState } from "../stores/holdings/atom";

import { fundingState } from "../stores/fundings/atom";
// https://k4backend.osuka.dev/
// https://k4backend.osuka.dev/docs/

function Login() {
  const [user, setUser] = useRecoilState(userState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useRecoilState(loginState);

  const [users, setUsers] = useRecoilState(usersState);
  const [holdings, setHoldings] = useRecoilState(holdingState);
  const [fundings, setFundings] = useRecoilState(fundingState);

  const { isOpen, onToggle } = useDisclosure();

  const navigate = useNavigate();

  const inputRef = useRef();
  // useEffect(() => {
  //   inputRef.current.focus();
  // });

  // finns inga updatedusers här..

  console.log(users);

  const userChecked = users.find(
    (user) => user.username === username && user.password === password
  );

  const loginb = () => {

    console.log(userChecked);

    if (userChecked) {
      setUser(userChecked);

      if (userChecked.funds.history.length > 0) {
        setFundings(userChecked.funds.history);
      }
      if (userChecked.holdings.history.length > 0) {
        setHoldings(userChecked.holdings.history);
      }

      console.log(userChecked);
      setLogged(true);
      navigate("/myaccount");
    }
    if (!userChecked) {
      onToggle();
  
    }
  };

  return (
    <AnimatedPage>
      <Center height="100vh" alignItems="flex-start">
        <Box flex-direction="column">
          <Box>
            <Heading
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "2xl", md: "4xl" }}
              lineHeight={"110%"}
              color={"var(--chakra-colors-gray-300)"}
              padding="3"
            >
              Welcome back <br />
              <Text as={"span"} color={"green.400"}>
                fellow Hedgehog
              </Text>
            </Heading>
          </Box>
          <Box max-width="250px">
            <Stack>
              <Input
                isRequired
                // ref={inputRef}
                color="white"
                name="username"
                // value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                type="text"
              ></Input>
              <Input
                color="white"
                name="password"
                // value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
              ></Input>
              <Button type="submit" onClick={loginb}>
                Login
              </Button>
              <Fade in={isOpen}>
                <Button
                  width="100%"
                  color="white"
                  bg="red.600"
                  rounded="md"
                  shadow="md"
                >
                  Incorrect username or password
                </Button>
              </Fade>
            </Stack>
          </Box>
        </Box>
      </Center>
    </AnimatedPage>
  );
}

export default Login;
