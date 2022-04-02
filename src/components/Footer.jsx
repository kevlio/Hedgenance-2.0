import { GiHedgehog } from "react-icons/gi";

import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";

const Logo = () => {
  return (
    <Center>
      <Link to="/">
        <GiHedgehog size={80} color="var(--chakra-colors-green-400)" />
      </Link>
    </Center>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

function Footer() {
  return (
    <Box bg="black" color="white">
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr 1fr" }}
          spacing={8}
        >
          <Stack justifyContent="flex-end" alignItems="flex-start">
            <Box>
              <Logo color={useColorModeValue("gray.700", "white")} />
              <Text fontSize={"sm"}>
                © 2022 kevl.io <br /> Art is whatever you can get away with -
                Warhol
              </Text>
            </Box>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Product</ListHeader>
            <Link href={"#"}>Overview</Link>
            <Link href={"#"}>Features</Link>
            <Link href={"#"}>Tutorials</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Link href={"#"}>About</Link>
            <Link href={"#"}>Contact</Link>
            <Link href={"#"}>Partners</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <Link href={"#"}>Help Center</Link>
            <Link href={"#"}>Terms of Service</Link>
            <Link href={"#"}>Privacy Policy</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Follow Us</ListHeader>
            <Link href={"#"}>Facebook</Link>
            <Link href={"#"}>Twitter</Link>
            <Link href={"#"}>LinkedIn</Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default Footer;
