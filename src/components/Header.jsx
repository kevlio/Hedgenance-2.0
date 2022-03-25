import React, { useState } from "react";
import { loginState, userState } from "../stores/auth/atom";
import { useRecoilState } from "recoil";
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

const Header = () => {
  const [logged, setLogged] = useRecoilState(loginState);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [username, setUsername] = useRecoilState(userState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: accIsOpen,
    onOpen: accOnOpen,
    onClose: accOnClose,
  } = useDisclosure();

  const handleLogged = () => {
    if (logged) {
      setLogged(false);
      setUsername("");
    }
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
          <Link href="/products">hedgeproducts</Link>
          <Link href="/crypto">cryptostore</Link>
          <Link href="/crypto">test trade mode</Link>

          <Link href={`${logged ? "/myaccount" : "/signup"}`}>{`${
            logged ? "account" : "sign up"
          }`}</Link>
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
