import { call, put, takeLeading, takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { login, fetchUser, register, updateUser } from './api';
import auth, { signIn, signUp, updateSettings } from './redux';
import { setAuthToken } from '../api';
import { SignedInUserWithProfile, Session } from './types';

const SESSION_TOKEN_NAME = 'token';

const loginSaga = function*(action: ReturnType<typeof signIn>) {
  const { token, ...userWithProfile }: Session = yield call(
    login,
    action.payload.email,
    action.payload.password,
  );
  yield call(setAuthToken, token);
  yield call(AsyncStorage.setItem, SESSION_TOKEN_NAME, token);
  yield put(auth.actions.loadedUser(userWithProfile));
};

const signUpSaga = function*(action: ReturnType<typeof signUp>) {
  const { token, ...userWithProfile }: Session = yield call(
    register,
    action.payload.username,
    action.payload.email,
    action.payload.password,
  );
  yield call(setAuthToken, token);
  yield call(AsyncStorage.setItem, SESSION_TOKEN_NAME, token);
  yield put(auth.actions.loadedUser(userWithProfile));
};

const updateUserSaga = function*(action: ReturnType<typeof updateSettings>) {
  const userWithProfile: SignedInUserWithProfile = yield call(updateUser, action.payload);
  yield put(auth.actions.loadedUser(userWithProfile));
};

export const loadSessionSaga = function*() {
  const token = yield call(AsyncStorage.getItem, SESSION_TOKEN_NAME);

  if (token) {
    yield call(setAuthToken, token);
    const userWithProfile: SignedInUserWithProfile = yield call(fetchUser);
    yield put(auth.actions.loadedUser(userWithProfile));
  } else {
    yield put(auth.actions.loadedGuest());
  }
};

const logOutSaga = function*() {
  yield call(AsyncStorage.removeItem, SESSION_TOKEN_NAME);
};

export default function*() {
  yield takeLeading(signIn, loginSaga);
  yield takeLeading(signUp, signUpSaga);
  yield takeLeading(updateSettings, updateUserSaga);
  yield takeEvery(auth.actions.logOut, logOutSaga);
}
