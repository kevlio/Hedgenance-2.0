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

export const categoryHoldingStatus = selector({
  key: "categoryHoldingStatus",
  get: ({ get }) => {
    const holdingStore = get(holdingState);

    const uniqueCategory = [
      ...new Set(holdingStore.map((holding) => holding.category)),
    ];

    let categoryTotal = [];
    let categoryStore = [];

    for (let i = 0; i < uniqueCategory.length; i++) {
      categoryTotal[i] = holdingStore.filter(
        (category) => category.category === uniqueCategory[i]
      );

      const totalAmountCategory = categoryTotal[i].reduce(
        (previousValue, currentValue) =>
          previousValue + parseInt(currentValue.amount),
        0
      );
      const totalPriceCategory = categoryTotal[i].reduce(
        (previousValue, currentValue) =>
          previousValue + parseInt(currentValue.price),
        0
      );
      categoryStore.push({
        id: i,
        category: uniqueCategory[i],
        amount: totalAmountCategory,
        value: totalPriceCategory,
      });
    }
    return {
      categoryStore,
    };
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

      const totalAmountProduct = productTotal[i].reduce(
        (previousValue, currentValue) =>
          previousValue + parseInt(currentValue.amount),
        0
      );
      const totalPriceProduct = productTotal[i].reduce(
        (previousValue, currentValue) =>
          previousValue + parseInt(currentValue.price),
        0
      );
      productStore.push({
        id: i,
        title: uniqueProduct[i],
        amount: totalAmountProduct,
        value: totalPriceProduct,
      });
    }
    return {
      productStore,
    };
  },
});
