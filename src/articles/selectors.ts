import { createSelector } from "@reduxjs/toolkit";

import { SelectorState } from "./redux";

const getArticleState = (state: SelectorState) => state.articles;
const getArticleSlug = (_: SelectorState, slug: string) => slug;

export const getAllArticleSlugs = createSelector(getArticleState, (state) =>
  Object.keys(state)
);

export const makeGetArticleBySlug = () =>
  createSelector(getArticleState, getArticleSlug, (state, slug) => state[slug]);

export const getArticleBySlug = makeGetArticleBySlug();
