import api from '../api';
import { User, Session } from './types';
import { createProfile, ProfileDataWithoutFollowing } from '../profiles';

type UserResponse = {
  user: ProfileDataWithoutFollowing & {
    email: string;
    token: string;
  };
};

const createUser = ({ user }: UserResponse): User => ({
  email: user.email,
  username: user.username,
});

export const login = (email: string, password: string) =>
  api.post('/users/login', { user: { email, password } }).then<Session>((response) => ({
    user: createUser(response.data),
    profile: createProfile(response.data),
    token: response.data.user.token,
  }));

export const fetchUser = () =>
  api.get<UserResponse>('/user').then((response) => ({
    user: createUser(response.data),
    profile: createProfile(response.data.user),
  }));
