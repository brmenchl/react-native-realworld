import { combineReducers } from '@reduxjs/toolkit';
import { articles } from '../articles';
import { profiles } from '../profiles';
import { auth } from '../auth';

const rootReducer = combineReducers({
  auth: auth.reducer,
  articles: articles.reducer,
  profiles: profiles.reducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
