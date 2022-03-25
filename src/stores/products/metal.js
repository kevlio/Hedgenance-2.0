import { atom } from "recoil";

export const metalProductState = atom({
  key: "metalProductState",
  default: [
    {
      id: 41,
      title: "Gold Troy Ounce",
      category: "Hard commodities",
      price: 2000,
      description: "coin king since 500 BC",
      image: "https://placekitten.com/450/450",
    },
    {
      id: 42,
      title: "Silver Troy Ounce",
      category: "Hard commodities",
      price: 25,
      description: "beaut, highest electrical conductivity too",
      image: "https://placekitten.com/450/450",
    },
    ,
    {
      id: 43,
      title: "Palladium Ounce",
      category: "Hard commodities",
      price: 2600,
      description: "rare and lustrous",
      image: "https://placekitten.com/450/450",
    },
    {
      id: 44,
      title: "Copper Pound",
      category: "Hard commodities",
      price: 5,
      description: "Electric feel now",
      image: "https://placekitten.com/450/450",
    },
  ],
});
