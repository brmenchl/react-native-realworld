import api from "../api";
import { createProfile, ProfileDataWithoutFollowing } from "../profiles/types";
import {
  Session,
  SignedInUserWithProfile,
  SignedInUser,
  UserSettings,
} from "./types";

type UserResponse = {
  user: ProfileDataWithoutFollowing & {
    email: string;
    token: string;
  };
};

const omitNilFields = <T>(o: Record<string, T | undefined>) =>
  Object.keys(o).reduce((acc, k) => {
    const value = o[k];

    return value
      ? {
          ...acc,
          [k]: value,
        }
      : acc;
  }, {});

const createUser = ({ user }: UserResponse): SignedInUser => ({
  email: user.email,
  username: user.username,
});

export const login = (email: string, password: string) =>
  api
    .post("/users/login", { user: { email, password } })
    .then<Session>((response) => ({
      user: createUser(response.data),
      profile: createProfile(response.data),
      token: response.data.user.token,
    }));

export const register = (username: string, email: string, password: string) =>
  api
    .post("/users/login", { user: { username, email, password } })
    .then<Session>((response) => ({
      user: createUser(response.data),
      profile: createProfile(response.data),
      token: response.data.user.token,
    }));

export const fetchUser = () =>
  api.get<UserResponse>("/user").then<SignedInUserWithProfile>((response) => ({
    user: createUser(response.data),
    profile: createProfile(response.data.user),
  }));

export const updateUser = (settings: UserSettings) =>
  api
    .put<UserResponse>("/user", {
      user: omitNilFields(settings),
    })
    .then<SignedInUserWithProfile>((response) => ({
      user: createUser(response.data),
      profile: createProfile(response.data.user),
    }));
