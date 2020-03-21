import { Profile } from '../profiles';

export type User = Guest | SignedInUser;

export type Guest = 'guest';
export const guest: Guest = 'guest';

export type SignedInUser = {
  email: string;
  username: string;
};

export type Session = {
  user: SignedInUser;
  profile: Profile;
  token: string;
};

export type SignedInUserWithProfile = {
  user: SignedInUser;
  profile: Profile;
};
