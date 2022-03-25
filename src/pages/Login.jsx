import {
  Input,
  Button,
  Center,
  Box,
  Stack,
  Heading,
  Text,
  FormControl,
} from "@chakra-ui/react";
import React, { useRef, useEffect } from "react";
import AnimatedPage from "../components/AnimatedPage";
import { Link, useNavigate } from "react-router-dom";
import { loginState, userState } from "../stores/auth/atom";
import { useRecoilState } from "recoil";

function Login() {
  const [username, setUsername] = useRecoilState(userState);
  const [logged, setLogged] = useRecoilState(loginState);

  const navigate = useNavigate();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  const login = () => {
    navigate("/myaccount");
    setLogged(true);

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
                ref={inputRef}
                color="white"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                type="text"
              ></Input>
              <Input
                color="white"
                name="password"
                placeholder="Password"
                type="password"
              ></Input>
              <Button type="submit" onClick={login}>
                Login
              </Button>
            </Stack>
          </Box>
        </Box>
      </Center>
    </AnimatedPage>
  );
}

export default Login;
