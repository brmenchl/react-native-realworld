import { omit } from 'ramda';
import api from '../api/client';
import { User } from './types';

type UserResponse = {
  user: User & {
    token: string;
  };
};

export type Session = {
  user: User;
  token: string;
};

export const login = (email: string, password: string) =>
  api.post('/users/login', { user: { email, password } }).then(
    ({
      data: {
        user: { token, ...user },
      },
    }) => ({ user, token } as Session),
  );

export const fetchUser = () =>
  api.get<UserResponse>('/user').then((response) => omit(['token'], response.data.user) as User);
