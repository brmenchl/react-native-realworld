import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchTags } from "./api";

const sliceName = "tags";

type SliceState = {
  isLoading: boolean;
  tags: string[];
};

type SelectorState = {
  [sliceName]: SliceState;
};

export const loadTags = createAsyncThunk<
  string[],
  void,
  { state: SelectorState }
>("tags/load", async () => await fetchTags(), {
  condition: (_, { getState }) => !isTagListLoading(getState()),
});

const slice = createSlice({
  name: sliceName,
  initialState: { isLoading: false, tags: [] },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(loadTags.pending, (state, action) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(loadTags.fulfilled, (state, action) => ({
        isLoading: false,
        tags: action.payload,
      })),
});

export default slice.reducer;

export const getAllTags = (state: SelectorState) => state[sliceName].tags;

export const isTagListLoading = (state: SelectorState) =>
  state[sliceName].isLoading;
