import { combineReducers } from "@reduxjs/toolkit";

import articlesReducer from "../articles/slice";
import authReducer from "../auth/slice";
import articlesListReducer from "../home/slice";
import profilesReducer from "../profiles/slice";

const rootReducer = combineReducers({
  auth: authReducer,
  articles: articlesReducer,
  articlesList: articlesListReducer,
  profiles: profilesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
