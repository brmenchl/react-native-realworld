import { call, put } from 'redux-saga/effects';
import { fetchArticles } from './api';
import { Article } from './types';
import articles from './redux';

export const loadListArticles = function*() {
  const newArticles: Article[] = yield call(fetchArticles);
  yield put(articles.actions.updateArticles(newArticles));
};
