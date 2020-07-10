import { createSelector } from "@reduxjs/toolkit";

import { SelectorState } from "./slice";

export const getProfilesState = (state: SelectorState) => state.profiles;
const getProfileUsername = (_: SelectorState, username: string) => username;

export const makeGetProfileByUsername = () =>
  createSelector(
    getProfilesState,
    getProfileUsername,
    (state, username) => state[username]
  );
