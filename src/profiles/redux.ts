import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { reduce } from 'ramda';
import { Profile } from './types';
import { articles, ArticleWithAuthor } from '../articles';

const sliceName = 'profiles';

type SliceState = { [slug: string]: Profile | undefined };

export type SelectorState = { [sliceName]: SliceState };

const profiles = createSlice({
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

export default profiles;
