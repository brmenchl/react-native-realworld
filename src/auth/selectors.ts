import { RootState } from "../app/rootReducer";
import { getProfileByUsername } from "../profiles";
import { SelectorState } from "./slice";
import { guest } from "./types";

const getAuthState = (state: SelectorState) => state.auth;

export const getIsLoggedIn = (state: RootState) =>
  getAuthState(state) !== guest;

export const getUserWithProfile = (state: RootState) => {
  const user = getAuthState(state);
  return user !== guest
    ? {
        user,
        profile: getProfileByUsername(state, user.username),
      }
    : guest;
};

export const getUserProfile = (state: RootState) => {
  const user = getAuthState(state);
  return user !== guest
    ? getProfileByUsername(state, user.username)
    : undefined;
};
