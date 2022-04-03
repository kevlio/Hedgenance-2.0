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
  loginState,
  userState,
  usersState,
  currentIDState,
} from "../stores/users/atom";

import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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
      setCurrentUser("");
    }
    // Ev. ta bort
    useResetRecoilState(fundingState);
    useResetRecoilState(holdingState);
  };

  const navigateAdmin = () => {
    // handleLogged();
    navigate("/adminlogin");
  };

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

      <Box display="flex" justifyContent="column" alignItems="center">
        <Box>
          <Link href="/">
            <Text
              fontSize="smaller"
              color="#48BB78"
              alignSelf="flex-end"
              my="-3"
            >
              Currency: EUR
            </Text>
            <Text fontSize="3xl" fontWeight="bold" pr={2}>
              Hedgnance
            </Text>
          </Link>
          <Link to="/adminlogin" onClick={navigateAdmin}>
            <Text
              onClick={navigateAdmin}
              fontSize="smaller"
              color="#48BB78"
              my="-2"
              mb="1"
            >
              Double pet hog for admin
            </Text>
          </Link>
        </Box>
        <GiHedgehog
          size={70}
          color="#48BB78"
          value="admin"
          onDoubleClick={navigateAdmin}
          // onClick={navigateHome}
        />
      </Box>

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
          <Link href="/cryptos">cryptos</Link>
          {/* <Link href="/products">commodities</Link> */}

          <Link href={`${logged ? "/myaccount" : "/signup"}`}>{`${
            logged ? "account" : "sign up"
          }`}</Link>
          {/* Sometimes colliding toggleLogged */}
          <Link
            href={`${logged ? "/myaccount" : "/login"}`}
            onClick={handleLogged}
          >{`${logged ? "logout" : "login"}`}</Link>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Header;
