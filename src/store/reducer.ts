import { combineReducers } from '@reduxjs/toolkit';
import { articles } from '../articles';

const rootReducer = combineReducers({
  articles: articles.reducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
