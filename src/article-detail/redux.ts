import { createAction, PayloadActionCreator } from "@reduxjs/toolkit";

export const loadArticleDetailScreen = createAction<string>(
  "screens/articleDetails/load"
) as PayloadActionCreator<string, string>;
