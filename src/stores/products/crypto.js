import { atom } from "recoil";

export const cryptoProductState = atom({
  key: "cryptoProductState",
  default: [
    {
      id: 21,
      title: "Bitcoin",
      category: "Cryptocurrencies",
      price: 300000,
      description: "Digital Gold",
      image:
        "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/2MKEHW6MJFB7VGD353DCQSCEB4.png",
    },
    {
      id: 22,
      title: "Dodge",
      category: "Cryptocurrencies",
      price: 1,
      description: "crypto go bipbop",
      image:
        "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/2MKEHW6MJFB7VGD353DCQSCEB4.png",
    },
    {
      id: 23,
      title: "Ethereum",
      category: "Cryptocurrencies",
      price: 20000,
      description: "Smart Crypto yo",
      image:
        "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/2MKEHW6MJFB7VGD353DCQSCEB4.png",
    },
    {
      id: 24,
      title: "Monero",
      category: "Cryptocurrencies",
      price: 120,
      description: "Smart Crypto N2 yo",
      image:
        "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/2MKEHW6MJFB7VGD353DCQSCEB4.png",
    },
  ],
});
