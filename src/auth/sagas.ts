import { call, put, takeLeading } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { login, fetchUser } from './api';
import auth, { signIn } from './redux';
import { setAuthToken } from '../api';

const SESSION_TOKEN_NAME = 'token';

const loginSaga = function*(action: ReturnType<typeof signIn>) {
  const { user, token } = yield call(login, action.payload.email, action.payload.password);
  yield call(setAuthToken, token);
  yield call(AsyncStorage.setItem, SESSION_TOKEN_NAME, token);
  yield put(auth.actions.loggedIn(user));
};

export const loadSessionSaga = function*() {
  const token = yield call(AsyncStorage.getItem, SESSION_TOKEN_NAME);

  if (token) {
    yield call(setAuthToken, token);
    const user = yield call(fetchUser);
    yield put(auth.actions.loadedUser(user));
  }
};

export default function*() {
  yield takeLeading(signIn, loginSaga);
}
