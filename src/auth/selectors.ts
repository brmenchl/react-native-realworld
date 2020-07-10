import { createSelector } from "@reduxjs/toolkit";

import { getProfilesState } from "../profiles";
import { SelectorState } from "./slice";
import { SignedInUserWithProfile, guest } from "./types";

const getAuthState = (state: SelectorState) => state.auth;

export const getIsLoggedIn = createSelector(
  getAuthState,
  (user) => user !== guest
);

export const getUserWithProfile = createSelector(
  getAuthState,
  getProfilesState,
  (user, profiles) =>
    user !== guest
      ? ({
          user,
          profile: profiles[user.username],
        } as SignedInUserWithProfile)
      : guest
);
