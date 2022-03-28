import {
  Input,
  Button,
  Center,
  Box,
  Stack,
  Heading,
  Progress,
  Text,
  Fade,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import AnimatedPage from "../components/AnimatedPage";
import {
  loginState,
  userState,
  usersState,
  updatedUsersState,
} from "../stores/auth/atom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { fundingState } from "../stores/fundings/atom";

function SignUp() {
  const [logged, setLogged] = useRecoilState(loginState);
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const [fundings, setFundings] = useRecoilState(fundingState);

  const [currentUser, setCurrentUser] = useRecoilState(userState);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // This feels stupid, redo
  // const [address, setAddress] = useState(["", "", "", ""]);
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState(0);
  const [zipcode, setZipcode] = useState("");

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [users, setUsers] = useRecoilState(usersState);
  const [updatedUsers, setUpdatedUsers] = useRecoilState(updatedUsersState);

  // Update list of users

  const inputRef = useRef();
  // useEffect(() => {
  //   inputRef.current.focus();
  // });

  const login = () => {
    const newUser = {
      username: username,
      password: password,
      email: email,
      name: {
        firstname: firstname,
        lastname: lastname,
      },
      address: {
        city: city,
        street: street,
        number: number,
        zipcode: zipcode,
      },
      id: Math.floor(Math.random() * 10000),
      role: "user",
      phone: phone,
    };

    setUpdatedUsers((prevUsers) => {
      return [...prevUsers, ...users, newUser];
    });

    setCurrentUser(newUser);

    console.log(users);

    setLogged(true);
    onToggle();
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

    navigate("/myaccount");
  };

  console.log(users);
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
                // ref={inputRef}
                autoComplete="off"
                color="white"
                name="username"
                placeholder="Hogname"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              ></Input>
              <Box display="flex" flexDirection="row">
                <Input
                  name="firstname"
                  color="white"
                  placeholder="First name"
                  type="text"
                  onChange={(e) => setFirstname(e.target.value)}
                ></Input>
                <Input
                  name="lastname"
                  color="white"
                  placeholder="Last name"
                  type="text"
                  onChange={(e) => setLastname(e.target.value)}
                ></Input>
              </Box>

              <Box display="flex" flexDirection="row">
                <Input
                  name="email"
                  color="white"
                  placeholder="Email"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
                <Input
                  name="email"
                  color="white"
                  placeholder="Phone number"
                  type="tel"
                  onChange={(e) => setPhone(e.target.value)}
                ></Input>
              </Box>
              <Input
                name="password"
                color="white"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
              {/* <Fade in={isOpen}> */}
              <Box display="flex" flexDirection="row">
                <Input
                  name="password"
                  color="white"
                  placeholder="Street name"
                  type="text"
                  onChange={(e) => setStreet(e.target.value)}
                ></Input>
                <Input
                  name="text"
                  color="white"
                  placeholder="Street number"
                  type="number"
                  onChange={(e) => setNumber(e.target.value)}
                ></Input>
              </Box>
              <Box display="flex" flexDirection="row">
                <Input
                  name="text"
                  color="white"
                  placeholder="City"
                  type="text"
                  onChange={(e) => setCity(e.target.value)}
                ></Input>
                <Input
                  name="text"
                  color="white"
                  placeholder="Zipcode"
                  type="text"
                  onChange={(e) => setZipcode(e.target.value)}
                ></Input>
              </Box>
              <Button type="submit" onClick={login}>
                Sign up now and get $1000 =)
              </Button>
              {/* </Fade> */}
              <Progress value={20} size="xs" colorScheme="pink" />
            </Stack>
          </Box>
        </Box>
      </Center>
    </AnimatedPage>
  );
}

export default SignUp;
