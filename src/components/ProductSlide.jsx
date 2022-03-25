import React from "react";
import {
  Link,
  Box,
  Text,
  Container,
  Center,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Textarea,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import { GiHedgehog, GiGoldBar, GiWheat } from "react-icons/gi";
import { FaBitcoin } from "react-icons/fa";
import { IoMdNuclear } from "react-icons/io";

function ProductSlide() {
  return (
    <Center>
      <Container as={Stack} maxW={"6xl"} py={{ base: 4, md: 4 }}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" }}
          spacing={8}
        >
          <Link
            color="var(--chakra-colors-pink-700)"
            href="/products"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <FaBitcoin size={70} />
            <Text color="var(--chakra-colors-gray-100)">Crypto currencies</Text>
            <StatGroup color="var(--chakra-colors-gray-300)">
              <Stat>
                <StatLabel>Bitcoin</StatLabel>
                <StatNumber>$39,060.51</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  5.38%
                </StatHelpText>
              </Stat>
            </StatGroup>
          </Link>
          <Link
            color="var(--chakra-colors-pink-700)"
            href="/products"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <GiGoldBar size={70} display="inline" />
            <Text color="var(--chakra-colors-gray-100)">Hard commodities</Text>
            <StatGroup color="var(--chakra-colors-gray-300)">
              <Stat>
                <StatLabel>Gold price</StatLabel>
                <StatNumber>$2,060.51</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  10.52%
                </StatHelpText>
              </Stat>
            </StatGroup>
          </Link>
          <Link
            color="var(--chakra-colors-pink-700)"
            href="/products"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <GiWheat size={70} />
            <Text color="var(--chakra-colors-gray-100)">Soft commodities</Text>
            <StatGroup color="var(--chakra-colors-gray-300)">
              <Stat>
                <StatLabel>Soft index</StatLabel>
                <StatNumber>$1,060.76</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  43.12%
                </StatHelpText>
              </Stat>
            </StatGroup>
          </Link>
          <Link
            color="var(--chakra-colors-pink-700)"
            href="/products"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <IoMdNuclear size={70} />
            <Text color="var(--chakra-colors-gray-100)">Power and Crudes</Text>
            <StatGroup color="var(--chakra-colors-gray-300)">
              <Stat>
                <StatLabel>Uranium spotprice</StatLabel>
                <StatNumber>$60.42</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  23.36%
                </StatHelpText>
              </Stat>
            </StatGroup>
          </Link>
        </SimpleGrid>
      </Container>
    </Center>
  );
}

export default ProductSlide;
