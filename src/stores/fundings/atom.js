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

export const fundingState = atom({
  key: "fundingState",
  default: [],
  effects_UNSTABLE: [localStorageEffect("funding")],
});

export const fundsTotal = atom({
  key: "fundsTotal",
  default: "",
  effects_UNSTABLE: [localStorageEffect("fundsTotal")],
});
