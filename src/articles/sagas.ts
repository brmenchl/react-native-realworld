import { call, put, select } from 'redux-saga/effects';
import { fetchArticles, fetchArticleBySlug } from './api';
import { ArticleWithAuthor } from './types';
import articles from './redux';
import { getArticleBySlug } from './selectors';

export const loadListArticlesSaga = function*() {
  const newArticles: ArticleWithAuthor[] = yield call(fetchArticles);
  yield put(articles.actions.updateArticles(newArticles));
};

export const loadArticleBySlugSaga = function*(slug: string) {
  if (yield select(getArticleBySlug, slug) !== undefined) {
    const newArticle: AArticleWithAuthorrticle = yield call(fetchArticleBySlug, slug);
    yield put(articles.actions.updateArticle(newArticle));
  }
};