import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { reduce } from "ramda";

import { AppThunk } from "../app/store";
import { fetchArticles, fetchArticleBySlug } from "./api";
import { getArticleBySlug } from "./selectors";
import { Article, ArticleWithProfile } from "./types";

const sliceName = "articles";

type SliceState = { [slug: string]: Article | undefined };

export type SelectorState = { [sliceName]: SliceState };

const insertArticle = (
  articleState: SliceState,
  newArticle: Article
): SliceState => ({
  ...articleState,
  [newArticle.slug]: newArticle,
});

const articles = createSlice({
  name: sliceName,
  initialState: {} as SliceState,
  reducers: {
    updatedArticles: (state, action: PayloadAction<ArticleWithProfile[]>) =>
      reduce(
        (acc, articleWithProfile) =>
          insertArticle(acc, articleWithProfile.article),
        state,
        action.payload
      ),
    updatedArticle: (state, action: PayloadAction<ArticleWithProfile>) =>
      insertArticle(state, action.payload.article),
  },
});

export const { updatedArticle, updatedArticles } = articles.actions;

export default articles.reducer;

export const loadArticles = (): AppThunk => async (dispatch) => {
  const newArticles = await fetchArticles();
  dispatch(updatedArticles(newArticles));
};

export const loadArticle = (slug: string): AppThunk => async (
  dispatch,
  getState
) => {
  const article = getArticleBySlug(getState(), slug);
  if (article !== undefined) {
    const articleWithProfile = await fetchArticleBySlug(slug);
    dispatch(updatedArticle(articleWithProfile));
  }
};
