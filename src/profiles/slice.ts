import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { loadArticle, loadArticles } from "../articles/slice";
import { loadedUser } from "../auth/slice";
import { Profile } from "./types";

const sliceName = "profiles";

type DataWithProfile = { profile: Profile };

type SliceState = { [slug: string]: Profile | undefined };

export type SelectorState = { [sliceName]: SliceState };

const profileAdapter = createEntityAdapter<Profile>({
  selectId: (profile) => profile.username,
});

const profiles = createSlice({
  name: sliceName,
  initialState: profileAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(
        loadArticles.fulfilled,
        (state, action: PayloadAction<DataWithProfile[]>) =>
          profileAdapter.upsertMany(
            state,
            action.payload.map((dataWithProfile) => dataWithProfile.profile)
          )
      )
      .addCase(
        loadArticle.fulfilled,
        (state, action: PayloadAction<DataWithProfile>) =>
          profileAdapter.upsertOne(state, action.payload.profile)
      )
      .addCase(loadedUser, (state, action: PayloadAction<DataWithProfile>) =>
        profileAdapter.upsertOne(state, action.payload.profile)
      ),
});

export default profiles.reducer;

export const { selectById: getProfileByUsername } = profileAdapter.getSelectors(
  (state) => state[sliceName]
);
