import React, { useEffect } from "react";
import { loginState, userState } from "../stores/auth/atom";
import { useRecoilValue, useRecoilState } from "recoil";
import { holdingState } from "../stores/holdings/atom";

import {
  Box,
  Text,
  Container,
  Center,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import LocalNav from "../components/LocalNav";
function Trades() {
  const user = useRecoilValue(userState);
  const [holdings, setHoldings] = useRecoilState(holdingState);
  console.log(`User: ${user}`);
  console.log(holdings);

  return (
    <Box minH="100vh" maxW="100%">
      <LocalNav />
      <Center>
        <Container
          color="var(--chakra-colors-gray-300)"
          px={{ base: "0", sm: "5", md: "12" }}
        >
          <Text fontSize="3xl" my={2}>
            Trading history
          </Text>
          <Table size="sm" variant="simple">
            {/* Todo: Dynamic sizing table */}
            <Thead>
              <Tr>
                <Th>Item</Th>
                <Th isNumeric>Price</Th>
                <Th isNumeric>Amount</Th>
                <Th isNumeric>amount x price</Th>
              </Tr>
            </Thead>
            {holdings.map((holding) => (
              <Tbody key={holding.id}>
                <Tr>
                  <Td>{holding.title}</Td>
                  <Td isNumeric>{holding.price.toLocaleString()}</Td>
                  <Td isNumeric>{holding.amount}</Td>
                  <Td isNumeric>{holding.price.toLocaleString()}</Td>
                </Tr>
              </Tbody>
            ))}
            <Tfoot>
              <Tr>
                <Th>Item</Th>
                <Th isNumeric>Price</Th>
                <Th isNumeric>Amount</Th>
                <Th isNumeric>amount x price</Th>
              </Tr>
            </Tfoot>
          </Table>
        </Container>
      </Center>
    </Box>
  );
}

export default Trades;
