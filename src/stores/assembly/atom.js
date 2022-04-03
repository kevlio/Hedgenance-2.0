import { atom } from "recoil";
import { selector } from "recoil";
import { userState } from "../users/atom";
import { fundingState } from "../fundings/atom";
import { holdingState } from "../holdings/atom";

import { productHoldingStatus } from "../holdings/selector";

import { fundingStatus } from "../fundings/selector";
import { holdingStatus } from "..//holdings/selector";

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const assemblyStatus = selector({
  key: "assemblyStatus",
  get: ({ get }) => {
    const productHolding = get(productHoldingStatus);
    const fundingTotal = get(fundingStatus);
    const holdingTotal = get(holdingStatus);
    const { totalHolding } = holdingTotal;
    const { totalFunds } = fundingTotal;
    const { productStore } = productHolding;
    console.log(productStore);
    console.log(productHolding);
    const userStore = get(userState);
    const userID = userStore.id;
    const fundingStore = get(fundingState);
    console.log(fundingStore);
    const holdingStore = get(holdingState);
    const assemblyStore = {
      [userID]: {
        user: userStore,
        funds: fundingStore,
        totalFunds,
        totalHolding,
        holdings: holdingStore,
        sortedHoldings: productStore,
      },
    };

    console.log(assemblyStore);
    return { assemblyStore };
  },
});

export const assemblyState = atom({
  key: "assembly",
  default: [],
  effects_UNSTABLE: [localStorageEffect("assembly")],
});
