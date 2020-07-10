import { combineReducers } from "@reduxjs/toolkit";

import articlesReducer from "../articles/slice";
import authReducer from "../auth/slice";
import profilesReducer from "../profiles/slice";

const rootReducer = combineReducers({
  auth: authReducer,
  articles: articlesReducer,
  profiles: profilesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
