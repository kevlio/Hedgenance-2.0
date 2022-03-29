import React, { useState, useEffect } from "react";

import {
  Box,
  Text,
  Container,
  SimpleGrid,
  Center,
  Button,
  Link,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  Input,
  FormControl,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";

import { AiOutlineEdit } from "react-icons/ai";

import LocalNav from "../components/LocalNav";
import { loginState, userState, usersState } from "../stores/auth/atom";

function Settings() {
  const [users, setUsers] = useRecoilState(usersState);
  const [user, setUser] = useRecoilState(userState);

  console.log(users);
  console.log(user);

  function editMode() {
    //   OnClick edit-icon change disabled to false
  }

  // Får felmeddelande "Found 8 elements with non-unique id, fields"
  return (
    <div>
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
          <FormControl isDisabled>
            <Box display="flex" flexDirection="row" gap={2} alignItems="center">
              <Input type="email" defaultValue={user.email} />
              <Input type="tel" defaultValue={user.phone} />
              <AiOutlineEdit size={60} />
            </Box>

            <Box display="flex" flexDirection="row" gap={2} alignItems="center">
              <Input type="text" defaultValue={user.username} />
              <Input type="password" defaultValue={user.password} />
              <AiOutlineEdit size={60} />
            </Box>

            <Box display="flex" flexDirection="row" gap={2} alignItems="center">
              <Input type="text" defaultValue={user.address.street} />
              <Input type="text" defaultValue={user.address.number} />
              <AiOutlineEdit size={60} />
            </Box>

            <Box display="flex" flexDirection="row" gap={2} alignItems="center">
              <Input type="text" defaultValue={user.address.city} />{" "}
              <Input type="text" defaultValue={user.address.zipcode} />
              <AiOutlineEdit size={60} />
            </Box>
          </FormControl>
        </Box>
      </Center>
    </div>
  );
}

export default Settings;
