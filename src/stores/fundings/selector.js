import { selector } from "recoil";
import { fundingState } from "./atom";

export const fundingStatus = selector({
  key: "fundingStatus",
  get: ({ get }) => {
    const fundingStore = get(fundingState);
    const totalFunds = fundingStore.reduce((total, current) => {
      const formattedAmount = parseInt(current.input);
      return total + formattedAmount;
    }, 0);
    return { totalFunds };
  },
});
