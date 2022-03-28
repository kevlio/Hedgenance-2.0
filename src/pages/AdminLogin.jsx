import React, { useEffect, useState, useRef } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [logged, setLogged] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef();
  const { isOpen, onToggle } = useDisclosure();
  //   useEffect(() => {
  //     inputRef.current.focus();
  //   });

  const login = () => {
    fetch("https://k4backend.osuka.dev/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: adminUsername === "admin" ? adminUsername : "incorrect",
        password: adminPassword === "admin" ? adminPassword : "incorrect",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setLogged(json);
        navigate("/admin");
      })
      .catch((error) => {
        onToggle();
        console.log(error);
      });
  };

  return (
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
              fellow Hogadmin
            </Text>
          </Heading>
        </Box>
        <Box max-width="250px">
          <Stack>
            <Input
              isRequired
              //   ref={inputRef}
              color="white"
              //   value={adminUsername}
              onChange={(e) => setAdminUsername(e.target.value)}
              placeholder="Username"
              type="text"
            ></Input>
            <Input
              color="white"
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Password"
              type="password"
            ></Input>
            <Button type="submit" onClick={login}>
              Login
            </Button>
            <Fade in={isOpen}>
              <Button
                width="100%"
                color="white"
                bg="red"
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
  );
}

export default AdminLogin;
