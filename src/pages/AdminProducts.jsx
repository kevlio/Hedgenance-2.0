import React from "react";
import {
  cryptoState,
  singleCryptoState,
  watchCryptoState,
} from "../stores/products/cryptos";

import {
  Center,
  Container,
  Box,
  SimpleGrid,
  Text,
  Checkbox,
  Stack,
  CheckboxGroup,
  List,
  ListItem,
  ListIcon,
  Button,
} from "@chakra-ui/react";

function AdminProducts() {
  return (
    <Text textColor="green.400">
      EDIT/ADD PRODUCTS. - En admin ska kunna uppdatera och ta bort en produkt i
      admin-panelen. FRÅGA: FRÅN EN PROFIL ELLER FRÅN CRYPTOSTATES?
    </Text>
  );
}

export default AdminProducts;
