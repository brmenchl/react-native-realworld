export type User = Guest | SignedInUser;

export type Guest = 'guest';
export const guest: Guest = 'guest';

export type SignedInUser = {
  email: string;
  username: string;
  bio: string;
  image: string | null;
};
