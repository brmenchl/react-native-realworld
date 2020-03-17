import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { reduce } from 'ramda';
import { Article } from './types';

const sliceName = 'articles';

type SliceState = { [slug: string]: Article | undefined };

export type SelectorState = { [sliceName]: SliceState };

const articles = createSlice({
  name: sliceName,
  initialState: {} as SliceState,
  reducers: {
    updateArticles: (state, action: PayloadAction<Article[]>) =>
      reduce((acc, article) => ({ ...acc, [article.slug]: article }), state, action.payload),
    updateArticle: (state, action: PayloadAction<Article>) => ({
      ...state,
      [action.payload.slug]: action.payload,
    }),
  },
});

export default articles;
