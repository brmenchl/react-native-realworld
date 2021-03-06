import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AsyncStorage } from "react-native";
import { batch } from "react-redux";

import { setAuthToken } from "../api";
import { AppThunk } from "../app/store";
import { loadedProfile } from "../profiles";
import { login, register, updateUser, fetchUser } from "./api";
import { User, guest, SignedInUserWithProfile, UserSettings } from "./types";

const sliceName = "auth";

type SliceState = User;

export type SelectorState = { [sliceName]: SliceState };

const authSlice = createSlice({
  name: sliceName,
  initialState: guest as SliceState,
  reducers: {
    loadedUser: (_, action: PayloadAction<SignedInUserWithProfile>) =>
      action.payload.user,
    loadedGuest: () => guest,
    logOut: () => guest,
  },
});

export const { loadedUser, loadedGuest, logOut } = authSlice.actions;

export default authSlice.reducer;

const SESSION_TOKEN_NAME = "token";

const persistSession = async (token: string) => {
  setAuthToken(token);
  await AsyncStorage.setItem(SESSION_TOKEN_NAME, token);
};

export const signIn = (email: string, password: string): AppThunk => async (
  dispatch
) => {
  try {
    const { token, ...userWithProfile } = await login(email, password);
    persistSession(token);
    batch(() => {
      dispatch(loadedUser(userWithProfile));
      dispatch(loadedProfile(userWithProfile));
    });
  } catch (e) {
    console.error(e);
  }
};

export const signUp = (
  username: string,
  email: string,
  password: string
): AppThunk => async (dispatch) => {
  try {
    const { token, ...userWithProfile } = await register(
      username,
      email,
      password
    );
    persistSession(token);
    dispatch(loadedUser(userWithProfile));
    dispatch(loadedProfile(userWithProfile));
  } catch (e) {
    console.error(e);
  }
};

export const updateSettings = (settings: UserSettings): AppThunk => async (
  dispatch
) => {
  try {
    const userWithProfile = await updateUser(settings);
    batch(() => {
      dispatch(loadedUser(userWithProfile));
      dispatch(loadedProfile(userWithProfile));
    });
  } catch (e) {
    console.error(e);
  }
};

export const loadSession = (): AppThunk => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem(SESSION_TOKEN_NAME);

    if (token) {
      setAuthToken(token);
      const userWithProfile = await fetchUser();
      batch(() => {
        dispatch(loadedUser(userWithProfile));
        dispatch(loadedProfile(userWithProfile));
      });
    } else {
      dispatch(loadedGuest());
    }
  } catch (e) {
    console.error(e);
  }
};

export const signOut = (): AppThunk => async () => {
  await AsyncStorage.removeItem(SESSION_TOKEN_NAME);
};
