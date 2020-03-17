import { takeLeading, call } from 'redux-saga/effects';
import { loadArticleBySlugSaga } from '../articles';
import { loadArticleDetailScreen } from './redux';

const loadArticleDetailScreenSaga = function*(action: ReturnType<typeof loadArticleDetailScreen>) {
  yield call(loadArticleBySlugSaga, action.payload);
};

export default function*() {
  yield takeLeading(loadArticleDetailScreen, loadArticleDetailScreenSaga);
}
