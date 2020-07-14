import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { Profile } from "./types";

const sliceName = "profiles";

type DataWithProfile = { profile: Profile };

type SliceState = { [slug: string]: Profile | undefined };

export type SelectorState = { [sliceName]: SliceState };

const profileAdapter = createEntityAdapter<Profile>({
  selectId: (profile) => profile.username,
});

const slice = createSlice({
  name: sliceName,
  initialState: profileAdapter.getInitialState(),
  reducers: {
    loadedProfile: (state, action: PayloadAction<DataWithProfile>) =>
      profileAdapter.upsertOne(state, action.payload.profile),
    loadedManyProfiles: (state, action: PayloadAction<DataWithProfile[]>) =>
      profileAdapter.upsertMany(
        state,
        action.payload.map((dataWithProfile) => dataWithProfile.profile)
      ),
  },
});

export default slice.reducer;

export const { selectById: getProfileByUsername } = profileAdapter.getSelectors(
  (state) => state[sliceName]
);

export const { loadedProfile, loadedManyProfiles } = slice.actions;
