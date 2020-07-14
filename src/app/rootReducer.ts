import { combineReducers } from "@reduxjs/toolkit";

import articlesReducer from "../articles/slice";
import authReducer from "../auth/slice";
import articlesListReducer from "../home/slice";
import profilesReducer from "../profiles/slice";
import tagsReducer from "../tags/slice";

const rootReducer = combineReducers({
  auth: authReducer,
  articles: articlesReducer,
  articlesList: articlesListReducer,
  profiles: profilesReducer,
  tags: tagsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
