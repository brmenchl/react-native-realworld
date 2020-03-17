import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { reduce } from 'ramda';
import { ArticleWithAuthor, Article, normalizeArticle } from './types';

const sliceName = 'articles';

type SliceState = { [slug: string]: Article | undefined };

export type SelectorState = { [sliceName]: SliceState };

const articles = createSlice({
  name: sliceName,
  initialState: {} as SliceState,
  reducers: {
    updateArticles: (state, action: PayloadAction<ArticleWithAuthor[]>) =>
      reduce(
        (acc, articleWithAuthor) => ({
          ...acc,
          [articleWithAuthor.slug]: normalizeArticle(articleWithAuthor),
        }),
        state,
        action.payload,
      ),
    updateArticle: (state, action: PayloadAction<ArticleWithAuthor>) => ({
      ...state,
      [action.payload.slug]: normalizeArticle(action.payload),
    }),
  },
});

export default articles;
