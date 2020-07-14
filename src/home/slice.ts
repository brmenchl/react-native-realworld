import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { loadedManyArticles } from "../articles";
import { fetchArticles } from "../articles/api";
import { loadedManyProfiles } from "../profiles";

const sliceName = "articlesList";

interface SliceState {
  isLoading: boolean;
  slugs: string[];
  filterTag?: string;
}

interface SelectorState {
  [sliceName]: SliceState;
}

export const loadMoreArticlesList = createAsyncThunk<
  string[],
  void,
  { state: SelectorState }
>("articlesList/loadMore", async (_, { getState, dispatch }) => {
  const sliceState = getState()[sliceName];
  const newOffset = sliceState.slugs.length;
  const currentFilterTag = sliceState.filterTag;
  const articlesWithProfiles = await fetchArticles({
    offset: newOffset,
    tag: currentFilterTag,
  });
  dispatch(loadedManyArticles(articlesWithProfiles));
  dispatch(loadedManyProfiles(articlesWithProfiles));
  return articlesWithProfiles.map(({ article }) => article.slug);
});

export const filterArticleListByTag = createAsyncThunk<
  string[],
  string | undefined,
  { state: SelectorState }
>("articlesList/filterByTag", async (tag, { dispatch }) => {
  const articlesWithProfiles = await fetchArticles({ offset: 0, tag });
  dispatch(loadedManyArticles(articlesWithProfiles));
  dispatch(loadedManyProfiles(articlesWithProfiles));
  return articlesWithProfiles.map(({ article }) => article.slug);
});

export const clearTagFilter = () => filterArticleListByTag(undefined);

const articlesListSlice = createSlice({
  name: sliceName,
  initialState: { isLoading: false, slugs: [] } as SliceState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(loadMoreArticlesList.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(loadMoreArticlesList.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        slugs: [...state.slugs, ...action.payload],
      }))
      .addCase(filterArticleListByTag.pending, (state, action) => ({
        ...state,
        isLoading: true,
        filterTag: action.meta.arg,
      }))
      .addCase(filterArticleListByTag.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        slugs: action.payload,
      })),
});

export default articlesListSlice.reducer;

export const getArticleListSlugs = (state: SelectorState) =>
  state[sliceName].slugs;

export const getArticleListFilterTag = (state: SelectorState) =>
  state[sliceName].filterTag;
