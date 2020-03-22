import React from 'react';
import { Thumbnail, H2 } from 'native-base';
import { DEFAULT_AVATAR_URL, Profile } from './types';

export const BigAvatar: React.FC<{ profile: Profile }> = ({ profile }) => (
  <>
    <Thumbnail source={{ uri: profile.image ?? DEFAULT_AVATAR_URL }} />
    <H2>{profile.username}</H2>
  </>
);
