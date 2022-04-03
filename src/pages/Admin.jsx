import React, { useEffect, useState } from "react";
import {
  Center,
  Container,
  Box,
  SimpleGrid,
  Text,
  Checkbox,
  Stack,
  CheckboxGroup,
  List,
  ListItem,
  ListIcon,
  Button,
} from "@chakra-ui/react";
import { usersState } from "../stores/users/atom";
import { useRecoilState } from "recoil";

import { MdCheckCircle } from "react-icons/md";

import { adminState } from "../stores/users/atom";

import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
// En admin ska kunna logga in
// En admin ska kunna besöka en särskild sida endast en inloggad admin kan besöka, med en lista på samtliga produkter och användare

function Admin() {
  const [users, setUsers] = useRecoilState(usersState);
  const [adminLogged, setAdminLogged] = useState(adminState);

  const [filters, setFilters] = useState([]);
  const [filtersAll, setFiltersAll] = useState(false);

  const [filteredUsers, setFilteredUsers] = useState([]);

  const navigate = useNavigate();

  function handleLogged() {
    setAdminLogged(false);
    navigate("/adminlogin");
  }

  function handleCheck(event) {
    const name = event.target.name;
    if (!filters.includes(name)) {
      setFilters([...filters, name]);
    }
    if (filters.includes(name)) {
      setFilters(filters.filter((f) => f !== name));
    }
  }

  useEffect(() => {
    if (filters.length === 0) {
      setFilteredUsers(users);
    }
    if (filters.includes("funds")) {
      const filteredByFunds = users.filter((user) => user.funds.total > 0);
      setFilteredUsers(filteredByFunds);
    }
    if (filters.includes("holdings")) {
      const filteredByHoldings = users.filter(
        (user) => user.holdings.total > 0
      );
      setFilteredUsers(filteredByHoldings);
    }
    if (filters.includes("both")) {
      const filteredByBoth = users.filter(
        (user) => user.funds.total > 0 && user.holdings.total > 0
      );
      setFilteredUsers(filteredByBoth);
    }
  }, [filters]);

  console.log(filters);

  console.log(filteredUsers);

  // const filteredUsers =
  // filters.length === 0
  //   ? users
  //   : users.filter((user) => filters.includes(product.category));

  // function handleCheckAll() {
  //   setFiltersAll(!filtersAll);
  //   setFilters(allProducts.map((product) => product.category));
  //   if (filtersAll) {
  //     setFilters([]);
  //   }
  // }

  console.log(users);

  return (
    <Center>
      <Box display="flex" flexDirection="column">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Button bg="none" textColor="white">
            Users Information
          </Button>
          <Button bg="none" textColor="white" as="a" href="/adminproducts">
            Product information [link]
          </Button>
          <Button
            width="200px"
            alignSelf="flex-end"
            colorScheme="green"
            onClick={handleLogged}
          >
            Log out admin
          </Button>
        </Box>
        <CheckboxGroup colorScheme="green">
          <Stack
            my={5}
            spacing={[1, 5]}
            direction={["column", "row"]}
            color="gray.300"
          >
            <Text>Filter Users with: </Text>

            <Checkbox
              name="funds"
              onChange={handleCheck}
              isChecked={filters.includes("funds")}
            >
              Funds
            </Checkbox>
            <Checkbox
              name="holdings"
              onChange={handleCheck}
              isChecked={filters.includes("holdings")}
            >
              Holdings
            </Checkbox>
            <Checkbox
              name="both"
              onChange={handleCheck}
              isChecked={filters.includes("both")}
            >
              Both
            </Checkbox>
          </Stack>
        </CheckboxGroup>
        {/* <SimpleGrid
          templateColumns={{
            base: "1fr 1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
          }}
          spacing={4}
        > */}
        <Box>
          {/* <Text textColor="green.400">
      EDIT/ADD PRODUCTS. - En admin ska kunna uppdatera och ta bort en produkt i
      admin-panelen. FRÅGA: FRÅN EN PROFIL ELLER FRÅN CRYPTOSTATES?
    </Text> */}
          {filteredUsers.map((user) => (
            <Box
              key={user.id}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              textAlign="left"
              border="#48BB78 solid 1px"
              borderRadius="14px"
              p={4}
              textColor="white"
              whiteSpace="nowrap"
              alignItems="flex-start"
            >
              <Box display="flex" flexDirection="column" width="50%">
                <Text fontSize="2xl" fontWeight="bold" color={"green.400"}>
                  ID: {user.id}
                </Text>
                <Text>
                  {user.name.firstname} {user.name.lastname}
                </Text>

                <Text>
                  {user.username} {user.password}
                </Text>
                <Text></Text>
                <Text>
                  {user.address && user.address.street}{" "}
                  {user.address && user.address.number}
                </Text>
                <Text></Text>
                <Text>
                  {user.address && user.address.zipcode}{" "}
                  {user.address && user.address.city}
                </Text>
                <Text></Text>
              </Box>

              <Box display="flex" flexDirection="column" width="50%">
                <Box>
                  <Text borderBottom="1px solid #48BB78">Trading History</Text>
                  {user.holdings.history &&
                    user.holdings.history.map((holding) => (
                      <Box display="flex" flexDirection="row" gap={2}>
                        <Text>{holding.title}</Text>
                        <Text>{holding.amount}</Text>
                        <Text>x {holding.currentPrice}</Text>
                        <Text>= {holding.price.toLocaleString()}</Text>
                      </Box>
                    ))}
                  <Text borderTop="1px solid #48BB78">
                    Total Holdings: {user.holdings && user.holdings.total}
                  </Text>
                  <Text>Total Funds: {user.funds && user.funds.total}</Text>
                  <Text borderTop="1px solid #48BB78" textColor="blue.200">
                    Total Account Value:{" "}
                    {(
                      (user.funds && user.funds.total) +
                      (user.holdings && user.holdings.total)
                    ).toLocaleString()}
                  </Text>
                </Box>
                <AiOutlineEdit size={60} />
              </Box>
            </Box>
          ))}
        </Box>
        {/* {filteredUsers.map((user) => (
          <List
            spacing={3}
            key={user.id}
            display="flex"
            flexDirection="row"
            border="1px solid white"
            // whiteSpace="nowrap"
            textColor="white"
            // alignItems="flex-start"
            mt={2}
            p={2}
          >
            <ListItem mt="var(--chakra-space-3)">
              Funds: {user.funds && user.funds.total}
            </ListItem>
            <ListItem>
              Holdings: {user.holdings && user.holdings.total}
            </ListItem>
            <ListItem display="flex" flexDirection="row" gap={2}>
              <Text>ID: {user.id}</Text>
              <Text>{user.name.firstname}</Text>
              <Text>{user.name.lastname}</Text>
            </ListItem>
            <ListItem display="flex" flexDirection="row" gap={2}>
              <Text>{user.username}</Text>
              <Text>{user.password}</Text>
            </ListItem>
            <ListItem>{user.email}</ListItem>
            <ListItem display="flex" flexDirection="row" gap={2}>
              {/* Varför funkar det inte utan att göra &&??? */}
        {/* <Text>{user.address && user.address.city}</Text>
              <Text>{user.address && user.address.street}</Text>
              <Text>{user.address && user.address.number}</Text>
              <Text>{user.address && user.address.zipcode}</Text>
            </ListItem>
            <Box> */}{" "}
        {/* <Text>Show more information [show all holdings] fade</Text> */}
        {/* Skulle vara smutt att få till reducern här... */}
        {/* {user.holdings.history &&
                user.holdings.history.map((holding) => (
                  <Box display="flex" flexDirection="row" gap={2}>
                    <Text>{holding.title}</Text>
                    <Text>{holding.amount}</Text>
                    <Text>x {holding.currentPrice}</Text>
                    <Text>= {holding.price.toLocaleString()}</Text>
                  </Box>
                ))}
            </Box>
            <ListIcon as={MdCheckCircle} color="green.500" />
          </List>
        ))} */}
        {/* </SimpleGrid> */}
      </Box>
    </Center>
  );
}

export default Admin;
