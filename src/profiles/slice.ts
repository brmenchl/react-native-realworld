import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { updatedArticles } from "../articles/slice";
import { loadedUser } from "../auth/slice";
import { Profile } from "./types";

const sliceName = "profiles";

type DataWithProfile = { profile: Profile };

type SliceState = { [slug: string]: Profile | undefined };

export type SelectorState = { [sliceName]: SliceState };

const insertProfile = (
  profileState: SliceState,
  profile: Profile
): SliceState => ({
  ...profileState,
  [profile.username]: profile,
});

const profiles = createSlice({
  name: sliceName,
  initialState: {} as SliceState,
  reducers: {},
  extraReducers: {
    [updatedArticles.type]: (state, action: PayloadAction<DataWithProfile[]>) =>
      action.payload.reduce(
        (acc, dataWithProfile) => insertProfile(acc, dataWithProfile.profile),
        state
      ),
    [loadedUser.type]: (state, action: PayloadAction<DataWithProfile>) =>
      insertProfile(state, action.payload.profile),
  },
});

export default profiles.reducer;
