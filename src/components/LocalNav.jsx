import React from "react";
import { Box, Text, Container, Center, Button } from "@chakra-ui/react";
import { MdBuild } from "react-icons/md";

function LocalNav() {
  return (
    <Center>
      <Container
        color="var(--chakra-colors-gray-300)"
        maxW="100%"
        alignItems="center"
        justifyContent="center"
        fontSize="2xl"
        mb={2}
      >
        <Box
          display="flex"
          justifyContent="center"
          color="white"
          gap={8}
          my={2}
        >
          <Button
            color="white"
            variant="link"
            as="a"
            href="/myaccount"
            bg="none"
          >
            account
          </Button>
          <Button
            color="white"
            variant="link"
            as="a"
            href="/products"
            bg="none"
          >
            products
          </Button>
          <Button
            color="white"
            variant="link"
            as="a"
            href="/fundings"
            bg="none"
          >
            insert funds
          </Button>
          <Button color="white" variant="link" as="a" href="/trades" bg="none">
            trading history
          </Button>
          {/* <Button
            color="white"
            variant="link"
            as="a"
            href="/purchases"
            bg="none"
            rightIcon={<MdBuild size={15} alignSelf />}
          >
            settings
          </Button> */}
        </Box>
      </Container>
    </Center>
  );
}

export default LocalNav;
