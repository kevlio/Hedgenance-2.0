import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  cryptoState,
  singleCryptoState,
  watchCryptoState,
} from "../stores/products/cryptos";
import { useRecoilState } from "recoil";
import {
  Center,
  Container,
  Box,
  Text,
  Image,
  SimpleGrid,
  Checkbox,
  Stack,
  CheckboxGroup,
  Button,
  ButtonGroup,
  IconButton,
  Input,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";

import { useParams, useNavigate } from "react-router-dom";
import { GrAdd } from "react-icons/gr";
import { MdRemove } from "react-icons/md";

function Crypto() {
  // const params = useParams();
  const navigate = useNavigate();
  const [coins, setCoins] = useRecoilState(cryptoState);
  const [coin, setCoin] = useRecoilState(singleCryptoState);
  const [search, setSearch] = useState("");
  const [rank, setRank] = useState([1, 100]);
  const [watchlist, setWatchlist] = useRecoilState(watchCryptoState);
  const [filters, setFilters] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);

  // Fel tidzon uppdatering datum...? Eller ändra köp/sälj datum.
  // Vill man ens ha svensk tid? Kanske inställning i User

  useEffect(() => {
    if (coins.length === 0) {
      axios
        .get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        )
        .then((res) => {
          setCoins(res.data);
          setFilteredCoins(res.data);
          console.log(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    if (filters.length === 0) {
      setFilteredCoins(coins);
    }
    if (filters.includes("high24h")) {
      let highToLow = coins.slice(0);
      highToLow.sort(function (a, b) {
        return b.price_change_percentage_24h - a.price_change_percentage_24h;
      });

      setFilteredCoins(highToLow);
    }
    if (filters.includes("low24h")) {
      let lowToHigh = coins.slice(0);
      lowToHigh.sort(function (a, b) {
        return a.price_change_percentage_24h - b.price_change_percentage_24h;
      });

      setFilteredCoins(lowToHigh);
    }
  }, [filters]);

  const cryptoById = (coin) => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${coin}`)
      .then((res) => {
        setCoin(res.data);
        console.log(res.data);
        navigate(`/cryptos/${coin}`);
      })
      .catch((error) => console.log(error));
  };

  const searchCrypto = (e) => {
    setSearch(e.target.value);

    const filteredCryptos = coins.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCoins(filteredCryptos);
  };

  const rankingChange = (val) => {
    setRank(val);
    const filterTest = coins.filter(
      (coin) =>
        rank[0] <= coin.market_cap_rank && coin.market_cap_rank <= rank[1]
    );
    setFilteredCoins(filterTest);
  };

  const watchlistCrypto = (e) => {
    const newCrypto = e.target.name;
    setWatchlist((prevCrypto) => {
      return [...prevCrypto, newCrypto];
    });
    if (watchlist.includes(newCrypto)) {
      const removeArr = [...watchlist].filter((crypto) => crypto !== newCrypto);
      setWatchlist(removeArr);
    }
  };

  const showWatchlist = () => {
    const watchlistFilter = coins.filter((crypto) =>
      watchlist.includes(crypto.name)
    );
    setFilteredCoins(watchlistFilter);
  };

  const showAll = () => {
    setFilteredCoins(coins);
  };

  return (
    <Center flexDirection="column">
      <Input
        placeholder="Search Hedge"
        type="text"
        textColor="white"
        width="300px"
        // maxW="fit-content"
        onChange={searchCrypto}
      ></Input>

      <RangeSlider
        defaultValue={[0, 100]}
        min={1}
        max={100}
        step={2}
        width="300px"
        onChangeEnd={rankingChange}
        // isDisabled
      >
        <RangeSliderTrack bg="red.100">
          <RangeSliderFilledTrack bg="blue.500" />
        </RangeSliderTrack>
        <RangeSliderThumb boxSize={6} index={0} />
        <RangeSliderThumb boxSize={6} index={1} />
      </RangeSlider>
      <Text textColor="white">
        Filter By Market Cap: {rank[0]} - {rank[1]}
      </Text>
      <Box display="flex">
        {/* On CLick keep ColorState */}
        <Button
          bg="none"
          border="1px solid white"
          color="gray.400"
          mt={2}
          onClick={showWatchlist}
        >
          My watchlist
        </Button>
        <Button
          bg="none"
          border="1px solid white"
          color="gray.400"
          mt={2}
          onClick={showAll}
        >
          All
        </Button>
      </Box>
      <CheckboxGroup colorScheme="green">
        <Stack
          my={5}
          spacing={[1, 5]}
          direction={["column", "row"]}
          color="gray.300"
        >
          <Text>Sort by % Change 24h</Text>
          <Checkbox
            name="high24h"
            onChange={(e) => setFilters(e.target.name)}
            isChecked={filters.includes("high24h")}
          >
            High, Low
          </Checkbox>
          <Checkbox
            name="low24h"
            onChange={(e) => setFilters(e.target.name)}
            isChecked={filters.includes("low24h")}
          >
            Low, High
          </Checkbox>
        </Stack>
      </CheckboxGroup>
      <SimpleGrid
        templateColumns={{ sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" }}
        spacing={8}
        my={4}
      >
        {filteredCoins &&
          filteredCoins.map((coin) => (
            <Box
              key={coin.id}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              textAlign="left"
              border="#48BB78 solid 1px"
              borderRadius="14px"
              p={4}
              textColor="white"
              whiteSpace="nowrap"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text fontSize="2xl" fontWeight="bold" color={"green.400"}>
                  {" "}
                  {coin.name}
                </Text>

                <Image
                  src={coin.image}
                  boxSize="50px"
                  alignSelf="center"
                ></Image>
              </Box>
              <Text textColor="blue.400" alignSelf="flex-start">
                {coin.last_updated.replace(/[T_Z]/g, " ").slice(10, -5)}
              </Text>

              <Box
                display="flex"
                fontSize="2xl"
                justifyContent="space-between"
                fontWeight="bold"
              >
                <Text>€{coin.current_price.toLocaleString()}</Text>
                <Text
                  color={coin.price_change_percentage_24h > 0 ? "green" : "red"}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </Text>
              </Box>
              <Box
                display="flex"
                // alignSelf="flex-end"
                justifyContent="space-between"
              >
                <Text>24h High: {coin.high_24h.toLocaleString()}</Text>
                <Text>24h Low: {coin.low_24h.toLocaleString()}</Text>
              </Box>
              <Box
                display="flex"
                flexWrap="none"
                wordBreak="none"
                gap="12px"
                justifyContent="space-between"
                alignItems="center"
                fontSize="2xl"
                color="gray.400"
              >
                <Text>Market Cap</Text>
                <Text>€{(coin.market_cap / (1000000 * 1000)).toFixed(2)}B</Text>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button
                  onClick={(e) => cryptoById(e.target.value)}
                  value={coin.id}
                  colorScheme="green"
                  width="100%"
                  mt={2}
                  bg="none"
                  border="#48BB78 solid 1px"
                  alignSelf="center"
                >
                  Trade
                </Button>
                <ButtonGroup
                  size="md"
                  isAttached
                  variant="outline"
                  width="100%"
                  justifyContent="center"
                >
                  <Button mr="-px" name={coin.name} width="100%">
                    {watchlist.includes(coin.name)
                      ? "Remove from watchlist"
                      : "Add to watchlist"}
                  </Button>
                  <IconButton
                    aria-label="Add to friends"
                    bg={watchlist.includes(coin.name) ? "red.600" : "green.500"}
                    name={coin.name}
                    onClick={watchlistCrypto}
                    icon={
                      watchlist.includes(coin.name) ? <MdRemove /> : <GrAdd />
                    }
                  />
                  {/* icon={<GrAdd />} */}
                </ButtonGroup>
              </Box>
            </Box>
          ))}
      </SimpleGrid>
    </Center>
  );
}

export default Crypto;
