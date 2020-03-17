import { all, spawn, call } from 'redux-saga/effects';
import { homeScreenSaga } from '../home';
import { authSaga } from '../auth';

function* rootSaga() {
  const sagas = [homeScreenSaga, authSaga];

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
