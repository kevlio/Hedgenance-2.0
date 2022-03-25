import { atom } from "recoil";

export const energyProductState = atom({
  key: "energyProductState",
  default: [
    {
      id: 31,
      title: "Uranium Spot",
      category: "Power",
      price: 60,
      description: "Future of Energy",
      image: "https://placekitten.com/450/450",
    },
    {
      id: 32,
      title: "Brent Oil Barrel",
      category: "Power",
      price: 108,
      description: "Who runs the world? Oil!",
      image: "https://placekitten.com/450/450",
    },
  ],
});
