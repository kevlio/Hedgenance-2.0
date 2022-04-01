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
              alignItems="flex-start"
              p={2}
            >
              <Text>Funds: {user.funds && user.funds.total}</Text>
              <Text>Holdings: {user.holdings && user.holdings.total}</Text>
              <Box display="flex" flexDirection="row" gap={2}>
                <Text>ID: {user.id}</Text>
                <Text>{user.name.firstname}</Text>
                <Text>{user.name.lastname}</Text>
              </Box>
              <Box display="flex" flexDirection="row" gap={2}>
                <Text>{user.username}</Text>
                <Text>{user.password}</Text>
              </Box>
              <Text>{user.email}</Text>
              <Box display="flex" flexDirection="row" gap={2}>
                {/* Varför funkar det inte utan att göra &&??? */}
                <Text>{user.address && user.address.city}</Text>
                <Text>{user.address && user.address.street}</Text>
                <Text>{user.address && user.address.number}</Text>
                <Text>{user.address && user.address.zipcode}</Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Center>
  );
}

export default Admin;
