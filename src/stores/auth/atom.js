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
  default: [],
  effects_UNSTABLE: [localStorageEffect("username")],
});

export const passState = atom({
  key: "password",
  default: [],
  effects_UNSTABLE: [localStorageEffect("password")],
});

export const usersState = atom({
  key: "users",
  default: [],
  effects_UNSTABLE: [localStorageEffect("users")],
});

export const updatedUsersState = atom({
  key: "updatedUsers",
  default: [],
  effects_UNSTABLE: [localStorageEffect("updatedUsers")],
});
