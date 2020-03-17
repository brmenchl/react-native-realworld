import { takeLeading, call } from 'redux-saga/effects';
import { loadListArticlesSaga } from '../articles';
import { loadHomeScreen } from './redux';

const loadHomeScreenSaga = function*() {
  yield call(loadListArticlesSaga);
};

export default function*() {
  yield takeLeading(loadHomeScreen, loadHomeScreenSaga);
}
