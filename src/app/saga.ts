import { all, spawn, call } from "redux-saga/effects";

import { authSaga, loadSessionSaga } from "../auth";
import { homeScreenSaga } from "../home";

const bootstrapSaga = function* () {
  yield call(loadSessionSaga);
};

const sagas = [homeScreenSaga, authSaga];

function* rootSaga() {
  yield spawn(bootstrapSaga);
  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
          }
        }
      })
    )
  );
}

export default rootSaga;
