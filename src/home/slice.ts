import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { loadedManyArticles } from "../articles";
import { fetchArticles } from "../articles/api";
import { loadedManyProfiles } from "../profiles";

const sliceName = "articlesList";

interface SliceState {
  isLoading: boolean;
  slugs: string[];
}

interface SelectorState {
  [sliceName]: SliceState;
}

export const loadMoreArticlesList = createAsyncThunk<
  string[],
  void,
  { state: SelectorState }
>("articlesList/loadMore", async (_, { getState, dispatch }) => {
  const newOffset = getState()[sliceName].slugs.length;
  const articlesWithProfiles = await fetchArticles({ offset: newOffset });
  dispatch(loadedManyArticles(articlesWithProfiles));
  dispatch(loadedManyProfiles(articlesWithProfiles));
  return articlesWithProfiles.map(({ article }) => article.slug);
});

export const filterArticleListByTag = createAsyncThunk<
  string[],
  string,
  { state: SelectorState }
>("articlesList/filterByTag", async (tag, { dispatch }) => {
  const articlesWithProfiles = await fetchArticles({ offset: 0, tag });
  dispatch(loadedManyArticles(articlesWithProfiles));
  dispatch(loadedManyProfiles(articlesWithProfiles));
  return articlesWithProfiles.map(({ article }) => article.slug);
});

const articlesListSlice = createSlice({
  name: sliceName,
  initialState: { isLoading: false, slugs: [] },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(loadMoreArticlesList.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(loadMoreArticlesList.fulfilled, (state, action) => ({
        isLoading: false,
        slugs: [...state.slugs, ...action.payload],
      }))
      .addCase(filterArticleListByTag.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(filterArticleListByTag.fulfilled, (state, action) => ({
        isLoading: false,
        slugs: action.payload,
      })),
});

export default articlesListSlice.reducer;

export const getArticleListSlugs = (state: SelectorState) =>
  state[sliceName].slugs;
