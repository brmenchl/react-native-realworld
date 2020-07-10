import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { reduce } from "ramda";

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
    updateArticles: (state, action: PayloadAction<ArticleWithProfile[]>) =>
      reduce(
        (acc, articleWithProfile) =>
          insertArticle(acc, articleWithProfile.article),
        state,
        action.payload
      ),
    updateArticle: (state, action: PayloadAction<ArticleWithProfile>) =>
      insertArticle(state, action.payload.article),
  },
});

export default articles;
