import { createSelector } from '@reduxjs/toolkit';
import { SelectorState } from './redux';

const getAuthorsState = (state: SelectorState) => state.authors;
const getAuthorUsername = (_: SelectorState, username: string) => username;

export const makeGetAuthorByUsername = () =>
  createSelector(getAuthorsState, getAuthorUsername, (state, username) => state[username]);
