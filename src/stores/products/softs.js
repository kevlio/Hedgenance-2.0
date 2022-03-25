import { atom } from "recoil";

export const softsProductState = atom({
  key: "softsProductState",
  default: [
    {
      id: 51,
      title: "Wheat Ton",
      category: "Soft commodities",
      price: 362,
      description: "bc u can't eat bolivares",
      image: "https://placekitten.com/550/550",
    },
    {
      id: 52,
      title: "Corn 1 m³",
      category: "Soft commodities",
      price: 210,
      description: "bc u can't eat bolivares",
      image: "https://placekitten.com/550/550",
    },
    ,
    {
      id: 53,
      title: "Coffee 1 Kilogram",
      category: "Soft commodities",
      price: 5,
      description: "bc u can't eat bolivares",
      image: "https://placekitten.com/550/550",
    },
    {
      id: 54,
      title: "Soybeans 1 m³",
      category: "Soft commodities",
      price: 480,
      description: "bc u can't eat bolivares",
      image: "https://placekitten.com/550/550",
    },
  ],
});
