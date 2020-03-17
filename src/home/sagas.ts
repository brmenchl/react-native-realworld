import { takeLeading, call } from 'redux-saga/effects';
import { loadListArticles } from '../articles/sagas';
import { loadHomeScreen } from './redux';

const loadHomePageSaga = function*() {
  yield call(loadListArticles);
};

export default function*() {
  yield takeLeading(loadHomeScreen, loadHomePageSaga);
}
