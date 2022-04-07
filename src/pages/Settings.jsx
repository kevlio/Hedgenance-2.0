import React, { useState, useEffect } from "react";

import {
  Box,
  Container,
  Center,
  Button,
  Input,
  FormControl,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";

import { AiOutlineEdit } from "react-icons/ai";

import LocalNav from "../components/LocalNav";
import { loginState, userState, usersState } from "../stores/users/atom";

function Settings() {
  const [user, setUser] = useRecoilState(userState);
  const [edit, setEdit] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState(0);
  const [zipcode, setZipcode] = useState("");

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  function editMode() {
    setEdit(true);

    // setEdit(false);
    // Update User
    // Set Edit === false
    //   OnClick edit-icon change disabled to false
  }

  function updateUser() {
    const editUser = {
      ...user,
      username: username,
      password: password,
      email: email,
      phone: phone,
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
    };
    setUser(editUser);
    setEdit(false);
  }

  // Får felmeddelande "Found 8 elements with non-unique id, fields"
  return (
    <Container>
      <LocalNav />
      <Center>
        <Box
          display="flex"
          flexDirection="column"
          whiteSpace="nowrap"
          textColor="white"
          fontSize="2xl"
          p={2}
          alignItems="flex-start"
        >
          <Box display="flex" flexDirection="row" gap={2}>
            <h1>{user.name.firstname}</h1>
            <h1>{user.name.lastname}</h1>
          </Box>
          <FormControl isDisabled={!edit} onClick={editMode}>
            <Box display="flex" flexDirection="row" gap={2} alignItems="center">
              <Input
                type="email"
                placeholder="Email"
                defaultValue={user.email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="tel"
                placeholder="Tel. Number"
                defaultValue={user.phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <AiOutlineEdit size={60} />
            </Box>

            <Box display="flex" flexDirection="row" gap={2} alignItems="center">
              <Input
                type="text"
                placeholder="Username"
                defaultValue={user.username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                defaultValue={user.password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <AiOutlineEdit size={60} />
            </Box>

            <Box display="flex" flexDirection="row" gap={2} alignItems="center">
              <Input
                type="text"
                placeholder="Street"
                defaultValue={user.address.street}
                onChange={(e) => setStreet(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Street Number"
                defaultValue={user.address.number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <AiOutlineEdit size={60} />
            </Box>

            <Box display="flex" flexDirection="row" gap={2} alignItems="center">
              <Input
                type="text"
                placeholder="City"
                defaultValue={user.address.city}
                onChange={(e) => setCity(e.target.value)}
              />{" "}
              <Input
                type="text"
                placeholder="Zipcode"
                defaultValue={user.address.zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              />
              <AiOutlineEdit size={60} />
            </Box>
          </FormControl>
          <Button colorScheme="green" alignSelf="flex-end" onClick={updateUser}>
            Update User
          </Button>
        </Box>
      </Center>
    </Container>
  );
}

export default Settings;
