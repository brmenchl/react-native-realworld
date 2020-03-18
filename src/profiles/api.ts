import api from '../api';
import { createProfile, ProfileDataWithFollowing } from './types';

type ProfileResponse = {
  profile: ProfileDataWithFollowing;
};

export const fetchProfile = (username: string) =>
  api
    .get<ProfileResponse>(`/profiles/${username}`)
    .then((response) => createProfile(response.data.profile));

export const followUser = (username: string) =>
  api
    .post<ProfileResponse>(`/profiles/${username}/follow`)
    .then((response) => createProfile(response.data.profile));

export const unfollowUser = (username: string) =>
  api
    .delete<ProfileResponse>(`/profiles/${username}/follow`)
    .then((response) => createProfile(response.data.profile));
