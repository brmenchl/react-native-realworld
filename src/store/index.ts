import rootReducer from './reducer';

export { default as store } from './store';

export type RootState = ReturnType<typeof rootReducer>;
