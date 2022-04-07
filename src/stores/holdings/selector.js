import { selector } from "recoil";
import { holdingState } from "./atom";

export const holdingStatus = selector({
  key: "holdingStatus",
  get: ({ get }) => {
    const holdingStore = get(holdingState);

    const totalItems = holdingStore.length;

    const totalHolding = holdingStore.reduce((total, current) => {
      const formattedPrice = parseInt(current.price);
      return total + formattedPrice;
    }, 0);
    const totalAmount = holdingStore.reduce((total, current) => {
      const formattedAmount = parseInt(current.amount);
      return total + formattedAmount;
    }, 0);
    return { totalItems, totalHolding, totalAmount };
  },
});

export const productHoldingStatus = selector({
  key: "productHoldingStatus",
  get: ({ get }) => {
    const holdingStore = get(holdingState);

    const uniqueProduct = [
      ...new Set(holdingStore.map((holding) => holding.title)),
    ];

    let productTotal = [];
    let productStore = [];

    for (let i = 0; i < uniqueProduct.length; i++) {
      productTotal[i] = holdingStore.filter(
        (product) => product.title === uniqueProduct[i]
      );

      const uniqueID = [
        ...new Set(holdingStore.map((holding) => holding.coinID)),
      ];

      const totalAmountProduct = productTotal[i].reduce(
        (previousValue, currentValue) =>
          previousValue + parseInt(currentValue.amount),
        0
      );
      // Funkar ej
      const totalPriceProduct = productTotal[i].reduce(
        (previousValue, currentValue) =>
          previousValue + parseInt(currentValue.price),
        0
      );

      const cryptoPrice = productTotal[i].map((crypto) => crypto.price);
      const currentCryptoHolding = cryptoPrice.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      );

      productStore.push({
        id: i,
        title: uniqueProduct[i],
        coinID: uniqueID[i],
        amount: totalAmountProduct,
        value: currentCryptoHolding,
      });
    }
    return {
      productStore,
    };
  },
});
