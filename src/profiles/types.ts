export enum Relationship {
  Other = 'Other',
  Following = 'Following',
  Self = 'Self',
}

export type Profile = {
  username: string;
  bio: string;
  image: string;
  relationship: Relationship;
};

export type ProfileDataWithoutFollowing = {
  username: string;
  bio: string;
  image: string | null;
};

export type ProfileDataWithFollowing = ProfileDataWithoutFollowing & {
  following: boolean;
};

const hasFollowing = (
  data: ProfileDataWithFollowing | ProfileDataWithoutFollowing,
): data is ProfileDataWithFollowing => Object.prototype.hasOwnProperty.call(data, 'following');

const getRelationship = (
  data: ProfileDataWithFollowing | ProfileDataWithoutFollowing,
): Relationship => {
  if (hasFollowing(data)) {
    return data.following ? Relationship.Following : Relationship.Other;
  }
  return Relationship.Self;
};

export const createProfile = (
  data: ProfileDataWithFollowing | ProfileDataWithoutFollowing,
): Profile => ({
  username: data.username,
  bio: data.bio,
  image: data.image ?? '',
  relationship: getRelationship(data),
});

export const DEFAULT_AVATAR_URL = 'https://static.productionready.io/images/smiley-cyrus.jpg';
