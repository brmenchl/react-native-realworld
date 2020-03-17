import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { reduce } from 'ramda';
import { Article } from './types';

const sliceName = 'articles';

type Dictionary<K extends string, T> = { [P in K]?: T };
type SliceState = Dictionary<string, Article>;

export type SelectorState = { [sliceName]: SliceState };

const articles = createSlice({
  name: sliceName,
  initialState: {} as SliceState,
  reducers: {
    updateArticles: (state, action: PayloadAction<Article[]>) =>
      reduce((acc, article) => ({ ...acc, [article.slug]: article }), state, action.payload),
  },
});

export default articles;
