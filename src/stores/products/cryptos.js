import { atom } from "recoil";

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

export const cryptoState = atom({
  key: "cryptoState",
  default: [],
  effects_UNSTABLE: [localStorageEffect("cryptos")],
});

export const singleCryptoState = atom({
  key: "singleCryptoState",
  default: [],
  effects_UNSTABLE: [localStorageEffect("singleCrypto")],
});

export const watchCryptoState = atom({
  key: "watchCryptoState",
  default: [],
  effects_UNSTABLE: [localStorageEffect("watchCrypto")],
});
