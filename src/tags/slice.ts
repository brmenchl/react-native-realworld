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

export const loadTags = createAsyncThunk(
  "tags/load",
  async () => await fetchTags()
);

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
