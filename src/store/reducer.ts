import { combineReducers } from '@reduxjs/toolkit';
import { articles } from '../articles';
import { authors } from '../authors';

const rootReducer = combineReducers({
  articles: articles.reducer,
  authors: authors.reducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
