import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { User, guest } from './types';

const sliceName = 'auth';

type SliceState = User;

export type SelectorState = { [sliceName]: SliceState };

const auth = createSlice({
  name: sliceName,
  initialState: guest as SliceState,
  reducers: {
    loggedIn: (_, action: PayloadAction<User>) => action.payload,
    loadedUser: (_, action: PayloadAction<User>) => action.payload,
  },
});

export const signIn = createAction<{ email: string; password: string }>('auth/signIn');

export default auth;
