import React from "react";
import { Box, Text, Container, Center, Button, Stack } from "@chakra-ui/react";
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
        <Stack
          display="flex"
          justifyContent="center"
          // color="white"
          gap={8}
          my={2}
          // <Stack
          // my={5}
          spacing={[1, 5]}
          // Kanske bättre att använda SimpleGrid här? Fult att visa 5 på rad
          direction={["column", "row"]}
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
          <Button color="white" variant="link" as="a" href="/crypto" bg="none">
            cryptos
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
          <Button
            color="white"
            variant="link"
            as="a"
            href="/settings"
            bg="none"
            rightIcon={<MdBuild size={15} />}
          >
            settings
          </Button>
        </Stack>
      </Container>
    </Center>
  );
}

export default LocalNav;
