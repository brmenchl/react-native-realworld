import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";

import { User, guest, SignedInUserWithProfile, UserSettings } from "./types";

const sliceName = "auth";

type SliceState = User;

export type SelectorState = { [sliceName]: SliceState };

const auth = createSlice({
  name: sliceName,
  initialState: guest as SliceState,
  reducers: {
    loadedUser: (_, action: PayloadAction<SignedInUserWithProfile>) =>
      action.payload.user,
    loadedGuest: () => guest,
    logOut: () => guest,
  },
});

export const signIn = createAction<{ email: string; password: string }>(
  "auth/signIn"
);
export const signUp = createAction<{
  username: string;
  email: string;
  password: string;
}>("auth/signUp");
export const updateSettings = createAction<UserSettings>("auth/updateSettings");

export default auth;
