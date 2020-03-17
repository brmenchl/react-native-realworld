import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { reduce } from 'ramda';
import { Author } from './types';
import { articles, ArticleWithAuthor } from '../articles';

const sliceName = 'authors';

type SliceState = { [slug: string]: Author | undefined };

export type SelectorState = { [sliceName]: SliceState };

const authors = createSlice({
  name: sliceName,
  initialState: {} as SliceState,
  reducers: {},
  extraReducers: {
    [articles.actions.updateArticles.type]: (state, action: PayloadAction<ArticleWithAuthor[]>) =>
      reduce(
        (acc, article) => ({ ...acc, [article.author.username]: article.author }),
        state,
        action.payload,
      ),
  },
});

export default authors;
