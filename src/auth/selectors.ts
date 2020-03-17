import { createSelector } from '@reduxjs/toolkit';
import { SelectorState } from './redux';

const getAuthState = (state: SelectorState) => state.auth;

export const getIsLoggedIn = createSelector(getAuthState, (state) => state !== 'guest');
