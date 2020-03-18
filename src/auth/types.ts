import { Profile } from '../profiles';

export type User = Guest | SignedInUser;

export type Guest = 'guest';
export const guest: Guest = 'guest';

export type SignedInUser = {
  email: string;
  username: string;
};

export type Session = {
  user: User;
  profile: Profile;
  token: string;
};
