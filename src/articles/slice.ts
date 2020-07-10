import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { fetchArticles, fetchArticleBySlug } from "./api";
import { Article, ArticleWithProfile } from "./types";

const sliceName = "articles";

const articleAdaper = createEntityAdapter<Article>({
  selectId: (article) => article.slug,
  sortComparer: (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
});

const globalizedSelectors = articleAdaper.getSelectors(
  (state) => state[sliceName]
);
export const getArticleBySlug = globalizedSelectors.selectById as (
  state: unknown,
  slug: string
) => Article | undefined;

export const getAllArticleSlugs = globalizedSelectors.selectIds as (
  state: unknown
) => string[];

export const loadArticles = createAsyncThunk(
  "articles/loadAll",
  async () => await fetchArticles()
);

export const loadArticle = createAsyncThunk(
  "articles/load",
  async (slug: string, { getState }) => {
    return await fetchArticleBySlug(slug);
  },
  {
    condition: (slug, { getState }) =>
      getArticleBySlug(getState(), slug) === undefined,
  }
);

const articlesSlice = createSlice({
  name: sliceName,
  initialState: articleAdaper.getInitialState(),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(
        loadArticles.fulfilled,
        (state, action: PayloadAction<ArticleWithProfile[]>) =>
          articleAdaper.upsertMany(
            state,
            action.payload.map(
              (articleWithProfile) => articleWithProfile.article
            )
          )
      )
      .addCase(
        loadArticle.fulfilled,
        (state, action: PayloadAction<ArticleWithProfile>) =>
          articleAdaper.upsertOne(state, action.payload.article)
      ),
});

export default articlesSlice.reducer;
