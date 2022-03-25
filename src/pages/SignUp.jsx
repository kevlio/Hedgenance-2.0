import {
  Input,
  Button,
  Center,
  Box,
  Stack,
  Heading,
  Progress,
  Text,
} from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import AnimatedPage from "../components/AnimatedPage";
import { loginState, userState } from "../stores/auth/atom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { fundingState } from "../stores/fundings/atom";

function SignUp() {
  const [logged, setLogged] = useRecoilState(loginState);
  const navigate = useNavigate();
  const [username, setUsername] = useRecoilState(userState);
  const [fundings, setFundings] = useRecoilState(fundingState);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  const login = () => {
    navigate("/myaccount");
    setLogged(true);
    let date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const sec = String(date.getSeconds()).padStart(2, "0");

    date = `${yyyy}-${mm}-${dd} ${hour}:${min}:${sec}`;

    const newFund = {
      input: 1000,
      date: date,
      id: Math.floor(Math.random() * 10000),
    };
    setFundings((prevFunds) => {
      return [newFund, ...prevFunds];
    });

    console.log(logged);
    console.log(username);
  };

  return (
    <AnimatedPage>
      <Center height="100vh" alignItems="flex-start">
        <Box flex-direction="column">
          <Box>
            <Heading
              fontWeight={600}
              fontSize={{ base: "1xl", sm: "2xl", md: "4xl" }}
              lineHeight={"110%"}
              color={"var(--chakra-colors-gray-300)"}
              padding="3"
            >
              Let's get started <br />
              <Text as={"span"} color={"green.400"}>
                fellow Hedgehog
              </Text>
            </Heading>
          </Box>
          <Box max-width="250px">
            <Stack>
              <Input
                isRequired
                ref={inputRef}
                color="white"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Hogname"
                type="text"
              ></Input>
              <Input
                name="email"
                color="white"
                placeholder="Email"
                type="text"
              ></Input>
              <Input
                name="password"
                color="white"
                placeholder="Password"
                type="password"
              ></Input>
              <Button type="submit" onClick={login}>
                Sign up now and get $1000 =)
              </Button>
              <Progress value={20} size="xs" colorScheme="pink" />
            </Stack>
          </Box>
        </Box>
      </Center>
    </AnimatedPage>
  );
}

export default SignUp;
