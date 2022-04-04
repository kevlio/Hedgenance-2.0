import React, { useEffect, useState } from "react";
import {
  Center,
  Box,
  Text,
  Checkbox,
  Stack,
  CheckboxGroup,
  Button,
  Container,
} from "@chakra-ui/react";
import { usersState } from "../stores/users/atom";
import { useRecoilState } from "recoil";

import { adminState } from "../stores/users/atom";

import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";

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

  // Denna borde förbättras
  function handleCheck(event) {
    const name = event.target.name;
    if (!filters.includes(name)) {
      setFilters([...filters, name]);
    }
    if (filters.includes(name)) {
      setFilters(filters.filter((f) => f !== name));
    }
    if (filters.includes("funds")) {
      setFilteredUsers(users.filter((user) => user.funds.total > 0));
    }
    if (filters.includes("holdings")) {
      setFilteredUsers(users.filter((user) => user.holdings.total > 0));
    }
    if (filters.includes("both")) {
      setFilteredUsers(
        users.filter((user) => user.funds.total > 0 && user.holdings.total > 0)
      );
    }
  }

  console.log(filters);

  const filterUsers = filters.length === 0 ? users : filteredUsers;

  return (
    <Center>
      <Container>
        <Box display="flex" flexDirection="column">
          <Stack
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            my={2}
            spacing={[1, 5]}
            direction={["column", "row"]}
          >
            <Button bg="none" textColor="white" as="a" href="/admin">
              Users Information
            </Button>
            <Button bg="none" textColor="white" as="a" href="/adminproducts">
              Product Information
            </Button>
            <Button bg="none" textColor="white" onClick={handleLogged}>
              Log out admin
            </Button>
          </Stack>
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
          <Box>
            {filterUsers.map((user) => (
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
                // whiteSpace="nowrap"
                alignItems="flex-start"
                my={4}
              >
                <Box
                  width="35%"
                  display="flex"
                  flexDirection="column"
                  fontSize={{ base: "smaller", sm: "md", md: "1xl" }}
                >
                  <Text fontWeight="bold" color={"green.400"}>
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

                <Box display="flex" flexDirection="column" width="65%">
                  <Box>
                    <Text borderBottom="1px solid #48BB78">
                      Trading History
                    </Text>
                    {user.holdings.history &&
                      user.holdings.history.map((holding) => (
                        <Box
                          display="flex"
                          flexDirection="row"
                          gap={2}
                          key={holding.title}
                          fontSize={{
                            base: "smaller",
                            sm: "smaller",
                            md: "small",
                          }}
                        >
                          <Text>{holding.title}:</Text>
                          <Text>{holding.amount}</Text>
                          <Text>x {holding.currentPrice}</Text>
                          <Text> = {holding.price.toLocaleString()}</Text>
                        </Box>
                      ))}
                    <Box
                      fontSize={{
                        base: "smaller",
                        sm: "smaller",
                        md: "small",
                      }}
                    >
                      <Text borderTop="1px solid #48BB78">
                        Total Holdings:{" "}
                        {user.holdings && user.holdings.total.toLocaleString()}
                      </Text>
                      <Text>
                        Total Funds:{" "}
                        {user.funds && user.funds.total.toLocaleString()}
                      </Text>
                      <Text borderTop="1px solid #48BB78" textColor="blue.200">
                        Total Account Value:{" "}
                        {(
                          (user.funds && user.funds.total) +
                          (user.holdings && user.holdings.total)
                        ).toLocaleString()}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Center>
  );
}

export default Admin;
