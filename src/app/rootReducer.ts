import { combineReducers } from "@reduxjs/toolkit";

import { articles } from "../articles";
import { auth } from "../auth";
import { profiles } from "../profiles";

const rootReducer = combineReducers({
  auth: auth.reducer,
  articles: articles.reducer,
  profiles: profiles.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
