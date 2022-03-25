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

export const loginState = atom({
  key: "login",
  default: null,
  effects_UNSTABLE: [localStorageEffect("login")],
});

export const userState = atom({
  key: "username",
  default: "",
  effects_UNSTABLE: [localStorageEffect("username")],
});
