import React, { useEffect, useState } from "react";
import { Center, Container, Box, SimpleGrid } from "@chakra-ui/react";

// En admin ska kunna logga in
// En admin ska kunna besöka en särskild sida endast en inloggad admin kan besöka, med en lista på samtliga produkter och användare

function Admin() {
  const [users, setUsers] = useState("");
  useEffect(() => {
    fetch("https://k4backend.osuka.dev/users")
      .then((res) => res.json())
      .then((json) => setUsers(json));
  }, []);

  console.log(users);

  //   fetch('https://k4backend.osuka.dev/users/1')
  //             .then(res=>res.json())
  //             .then(json=>console.log(json))

  //   fetch('https://k4backend.osuka.dev/auth/login',{
  //             method:'POST',
  //             body:JSON.stringify({
  //                 username: "mor_2314",
  //                 password: "83r5^_"
  //             })
  //         })
  //             .then(res=>res.json())
  //             .then(json=>console.log(json))

  return (
    <Center>
      <SimpleGrid
        templateColumns={{ sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" }}
        spacing={8}
      >
        {users &&
          users.map((user) => (
            <Box
              key={user.id}
              display="flex"
              flexDirection="column"
              border="1px solid white"
              borderRadius="12px"
              whiteSpace="nowrap"
            >
              <Box
                display="flex"
                flexDirection="row"
                gap={2}
                alignSelf="center"
              >
                <h1>{user.name.firstname}</h1>
                <h1>{user.name.lastname}</h1>
              </Box>
              <h1>{user.username}</h1>
              <h1>{user.email}</h1>
              <Box
                display="flex"
                flexDirection="row"
                gap={2}
                alignSelf="center"
              >
                <h1>{user.address.city}</h1>
                <h1>{user.address.street}</h1>
                <h1>{user.address.number}</h1>
                <h1>{user.address.zipcode}</h1>
              </Box>
            </Box>
          ))}
      </SimpleGrid>
    </Center>
  );
}

export default Admin;
