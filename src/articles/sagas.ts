import { call, put, select } from "redux-saga/effects";

import { fetchArticles, fetchArticleBySlug } from "./api";
import articles from "./redux";
import { getArticleBySlug } from "./selectors";
import { ArticleWithProfile } from "./types";

export const loadListArticlesSaga = function* () {
  const newArticles: ArticleWithProfile[] = yield call(fetchArticles);
  yield put(articles.actions.updateArticles(newArticles));
};

export const loadArticleBySlugSaga = function* (slug: string) {
  if (yield select(getArticleBySlug, slug) !== undefined) {
    const articleWithProfile: ArticleWithProfile = yield call(
      fetchArticleBySlug,
      slug
    );
    yield put(articles.actions.updateArticle(articleWithProfile));
  }
};
