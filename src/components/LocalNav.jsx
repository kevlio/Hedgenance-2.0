import React from "react";
import {
  Box,
  Text,
  Container,
  Center,
  Button,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import { MdBuild } from "react-icons/md";
import {
  FiMenu,
  FiHome,
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiBriefcase,
  FiSettings,
} from "react-icons/fi";

import { userState } from "../stores/users/atom";
import { useRecoilValue, useRecoilState } from "recoil";

function LocalNav() {
  const currentUser = useRecoilValue(userState);
  return (
    <Center>
      <SimpleGrid
        // my={2}
        mb={4}
        mx={10}
        alignItems="center"
        // fontSize="lg"
        justifyContent="center"
        gap={{
          base: 2,
          sm: 2,
        }}
        fontSize={{
          base: "md",
          sm: "lg",
          md: "1xl",
        }}
        templateColumns={{
          base: "1fr 1fr 1fr 1fr",
          sm: "1fr 1fr 1fr 1fr",
          md: "1fr 1fr 1fr 1fr",
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <FiUser color="#E2E8F0" />
          <Button
            color="gray.50"
            variant="link"
            as="a"
            href="/myaccount"
            bg="none"
          >
            {currentUser.username}
          </Button>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <FiBriefcase color="#E2E8F0" />
          <Button
            color="gray.50"
            variant="link"
            as="a"
            href="/trades"
            bg="none"
          >
            trades
          </Button>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <FiDollarSign color="#E2E8F0" />
          <Button
            color="gray.50"
            variant="link"
            as="a"
            href="/fundings"
            bg="none"
          >
            funds
          </Button>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <FiSettings color="#E2E8F0" />
          <Button
            color="gray.50"
            variant="link"
            as="a"
            href="/settings"
            bg="none"
          >
            settings
          </Button>
        </Box>
      </SimpleGrid>
    </Center>
  );
}

export default LocalNav;
