import React, { useState } from "react";

import { useRecoilState, useResetRecoilState } from "recoil";
import { GiHedgehog } from "react-icons/gi";
import {
  AiOutlineMenu as MenuIcon,
  AiOutlineClose as CloseIcon,
} from "react-icons/ai";
import {
  Stack,
  Box,
  Text,
  Link,
  Flex,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  useDisclosure,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { isMobile } from "react-device-detect";

import { holdingState } from "../stores/holdings/atom";
import { fundingState } from "../stores/fundings/atom";
import { fundingStatus } from "../stores/fundings/selector";

import {
  holdingStatus,
  categoryHoldingStatus,
  productHoldingStatus,
} from "../stores/holdings/selector";

import {
  loginState,
  userState,
  usersState,
  currentIDState,
} from "../stores/auth/atom";

const Header = () => {
  const [logged, setLogged] = useRecoilState(loginState);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: accIsOpen,
    onOpen: accOnOpen,
    onClose: accOnClose,
  } = useDisclosure();

  const [users, setUsers] = useRecoilState(usersState);
  const [fundings, setFundings] = useRecoilState(fundingState);
  const [holdings, setHoldings] = useRecoilState(holdingState);

  const handleLogged = () => {
    if (logged) {
      setLogged(false);
      setFundings([]);
      setHoldings([]);

      const filteredUsers = users.filter((user) => user.id !== currentUser.id);

      setUsers([currentUser, ...filteredUsers]);
      // Lägga till användare i UsersState
      useResetRecoilState(fundingState);

      useResetRecoilState(holdingState);
      useResetRecoilState(holdingStatus);
      useResetRecoilState(fundingStatus);
      useResetRecoilState(productHoldingStatus);
      setCurrentUser("");
    }
  };

  console.log(users);

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <Flex
      // position="fixed"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      // mb={8}
      p={8}
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
      color={["white", "white", "primary.700", "primary.700"]}
    >
      {/* Logo */}
      <Link href="/">
        <Box display="flex" justifyContent="column" alignItems="center">
          <Text fontSize="3xl" fontWeight="bold" pr={2}>
            Hedgnance
          </Text>
          <GiHedgehog size={70} color="#48BB78" />
        </Box>
      </Link>
      {/* MenuToggle */}
      <Box
        display={{ base: "block", md: "none" }}
        color="white"
        onClick={() => toggleMenu()}
      >
        {menuIsOpen ? <CloseIcon size={50} /> : <MenuIcon size={40} />}
      </Box>
      {/* Menu-items */}
      <Box
        display={{ base: menuIsOpen ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
        color="white"
      >
        <Stack
          spacing={8}
          align="flex-end"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
          fontSize="2xl"
        >
          <Link href="/">home</Link>
          <Link href="/crypto">cryptos</Link>
          <Link href="/products">commodities</Link>

          <Link href={`${logged ? "/myaccount" : "/signup"}`}>{`${
            logged ? "account" : "sign up"
          }`}</Link>
          {/* Funkar inte att logga ut från page myaccount */}
          <Link
            href={`${logged ? "/myaccount" : "/login"}`}
            onClick={handleLogged}
          >{`${logged ? "logout" : "login"}`}</Link>
          {/* <Box>
            <Menu isOpen={accIsOpen}>
              <MenuButton
                as="a"
                href={`${logged ? "/myaccount" : "/signup"}`}
                variant="ghost"
                onMouseEnter={isMobile ? () => false : accOnOpen}
                onMouseLeave={accOnClose}
              >
                account
                {accIsOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </MenuButton>
              <MenuList
                bg="black"
                onClick={accOnOpen}
                onMouseEnter={isMobile ? () => false : accOnOpen}
                onMouseLeave={accOnClose}
              >
                <MenuItem
                  fontSize="xl"
                  fontWeight="bold"
                  as="a"
                  href={`${logged ? "/myaccount" : "/login"}`}
                  _hover={{ bg: useColorModeValue("pink.700", "blue.700") }}
                >{`${logged ? "My Account" : "Login"}`}</MenuItem>
                <MenuItem
                  fontSize="xl"
                  fontWeight="bold"
                  as="a"
                  href={`${logged ? "/myaccount" : "/signup"}`}
                  onClick={handleLogged}
                  _hover={{ bg: useColorModeValue("pink.700", "blue.700") }}
                >{`${logged ? "Log out" : "Sign up"}`}</MenuItem>
              </MenuList>
            </Menu>
          </Box> */}
        </Stack>
      </Box>
    </Flex>
  );
};

export default Header;
