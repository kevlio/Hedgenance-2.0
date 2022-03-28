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
import {
  loginState,
  userState,
  passState,
  usersState,
  updatedUsersState,
} from "../stores/auth/atom";
import { useRecoilState, useRecoilValue } from "recoil";

// https://k4backend.osuka.dev/
// https://k4backend.osuka.dev/docs/

function Login() {
  const [user, setUser] = useRecoilState(userState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useRecoilState(loginState);

  const [users, setUsers] = useRecoilState(usersState);

  const updatedUsers = useRecoilValue(updatedUsersState);

  const { isOpen, onToggle } = useDisclosure();

  const navigate = useNavigate();

  const inputRef = useRef();
  // useEffect(() => {
  //   inputRef.current.focus();
  // });

  const userChecked = updatedUsers.find(
    (user) => user.username === username && user.password === password
  );

  console.log(userChecked);

  const loginb = () => {
    fetch("https://k4backend.osuka.dev/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setLogged(json);
        setUser(json);
        navigate("/myaccount");
      })
      .catch((error) => {
        if (!userChecked) {
          onToggle();
          console.log(error);
        }
      });

    if (userChecked) {
      setUser(userChecked);
      setLogged(true);
      navigate("/myaccount");
    }
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
