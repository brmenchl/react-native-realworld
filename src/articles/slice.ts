import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  EntityState,
} from "@reduxjs/toolkit";

import { loadedProfile } from "../profiles";
import { fetchArticleBySlug } from "./api";
import { Article, ArticleWithProfile } from "./types";

const sliceName = "articles";

const articleAdaper = createEntityAdapter<Article>({
  selectId: (article) => article.slug,
  sortComparer: (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
});

interface SliceState extends EntityState<Article> {}

interface SelectorState {
  [sliceName]: SliceState;
}

const globalizedSelectors = articleAdaper.getSelectors(
  (state: SelectorState) => state[sliceName]
);
export const getArticleBySlug = globalizedSelectors.selectById as (
  state: SelectorState,
  slug: string
) => Article | undefined;

export const getAllArticleSlugs = globalizedSelectors.selectIds as (
  state: SelectorState
) => string[];

export const loadArticle = createAsyncThunk<
  Article,
  string,
  { state: SelectorState }
>(
  "articles/load",
  async (slug, { dispatch }) => {
    const articleWithProfile = await fetchArticleBySlug(slug);
    dispatch(loadedProfile(articleWithProfile));
    return articleWithProfile.article;
  },
  {
    condition: (slug, thunkAPI) =>
      getArticleBySlug(thunkAPI.getState(), slug) === undefined,
  }
);

const articlesSlice = createSlice({
  name: sliceName,
  initialState: articleAdaper.getInitialState(),
  reducers: {
    loadedManyArticles: (state, action: PayloadAction<ArticleWithProfile[]>) =>
      articleAdaper.upsertMany(
        state,
        action.payload.map((articleWithProfile) => articleWithProfile.article)
      ),
  },
  extraReducers: (builder) =>
    builder.addCase(
      loadArticle.fulfilled,
      (state, action: PayloadAction<Article>) =>
        articleAdaper.upsertOne(state, action.payload)
    ),
});

export default articlesSlice.reducer;

export const { loadedManyArticles } = articlesSlice.actions;
