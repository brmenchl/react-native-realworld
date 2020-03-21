import api from '../api';
import { Session, SignedInUserWithProfile, SignedInUser } from './types';
import { createProfile, ProfileDataWithoutFollowing } from '../profiles';

type UserResponse = {
  user: ProfileDataWithoutFollowing & {
    email: string;
    token: string;
  };
};

const createUser = ({ user }: UserResponse): SignedInUser => ({
  email: user.email,
  username: user.username,
});

export const login = (email: string, password: string) =>
  api.post('/users/login', { user: { email, password } }).then<Session>((response) => ({
    user: createUser(response.data),
    profile: createProfile(response.data),
    token: response.data.user.token,
  }));

export const register = (username: string, email: string, password: string) =>
  api.post('/users/login', { user: { username, email, password } }).then<Session>((response) => ({
    user: createUser(response.data),
    profile: createProfile(response.data),
    token: response.data.user.token,
  }));

export const fetchUser = () =>
  api.get<UserResponse>('/user').then<SignedInUserWithProfile>((response) => ({
    user: createUser(response.data),
    profile: createProfile(response.data.user),
  }));
