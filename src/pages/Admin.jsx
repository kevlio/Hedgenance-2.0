import React, { useEffect, useState } from "react";
import { Center, Container, Box, SimpleGrid, Text } from "@chakra-ui/react";
import { usersState } from "../stores/auth/atom";
import { useRecoilState } from "recoil";
import UserInfo from "./Settings";

// En admin ska kunna logga in
// En admin ska kunna besöka en särskild sida endast en inloggad admin kan besöka, med en lista på samtliga produkter och användare

function Admin() {
  const [users, setUsers] = useRecoilState(usersState);

  console.log(users);

  return (
    <Center>
      <Box>
        <Text textColor="white" fontSize="3xl">
          FILTER PEOPLE WITH HOLDINGS/FUNDINGS
        </Text>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" }}
          spacing={4}
        >
          {users.map((user) => (
            <Box
              key={user.id}
              display="flex"
              flexDirection="column"
              border="1px solid blue"
              borderRadius="12px"
              whiteSpace="nowrap"
              textColor="white"
            >
              <h1>Funds: {user.funds && user.funds.total}</h1>
              <Box
                display="flex"
                flexDirection="row"
                gap={2}
                alignSelf="center"
              >
                <h1>ID: {user.id}</h1>
                <h1>{user.name.firstname}</h1>
                <h1>{user.name.lastname}</h1>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                gap={2}
                alignSelf="center"
              >
                <h1>{user.username}</h1>
                <h1>{user.password}</h1>
              </Box>
              <h1>{user.email}</h1>
              <Box
                display="flex"
                flexDirection="row"
                gap={2}
                alignSelf="center"
              >
                {/* Varför funkar det inte utan att göra &&??? */}
                <h1>{user.address && user.address.city}</h1>
                <h1>{user.address && user.address.street}</h1>
                <h1>{user.address && user.address.number}</h1>
                <h1>{user.address && user.address.zipcode}</h1>
              </Box>
              <h1>Funds:</h1>
              <h1>Holdings:</h1>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Center>
  );
}

export default Admin;
