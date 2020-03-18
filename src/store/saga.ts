import { all, spawn, call } from 'redux-saga/effects';
import { homeScreenSaga } from '../home';
import { authSaga, loadSessionSaga } from '../auth';

const bootstrapSaga = function*() {
  yield call(loadSessionSaga);
};

const sagas = [homeScreenSaga, authSaga];

function* rootSaga() {
  yield call(bootstrapSaga);
  yield all(
    sagas.map((saga) =>
      spawn(function*() {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
          }
        }
      }),
    ),
  );
}

export default rootSaga;
