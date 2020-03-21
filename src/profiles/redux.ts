import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from './types';
import articles from '../articles/redux';
import auth from '../auth/redux';

const sliceName = 'profiles';

type DataWithProfile = { profile: Profile };

type SliceState = { [slug: string]: Profile | undefined };

export type SelectorState = { [sliceName]: SliceState };

const insertProfile = (profileState: SliceState, profile: Profile): SliceState => ({
  ...profileState,
  [profile.username]: profile,
});

const profiles = createSlice({
  name: sliceName,
  initialState: {} as SliceState,
  reducers: {},
  extraReducers: {
    [articles.actions.updateArticles.type]: (state, action: PayloadAction<DataWithProfile[]>) =>
      action.payload.reduce(
        (acc, dataWithProfile) => insertProfile(acc, dataWithProfile.profile),
        state,
      ),
    [auth.actions.loadedUser.type]: (state, action: PayloadAction<DataWithProfile>) =>
      insertProfile(state, action.payload.profile),
  },
});

export default profiles;
