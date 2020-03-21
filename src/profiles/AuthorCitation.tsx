import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Thumbnail, Text, Card } from 'native-base';
import { RootState } from '../store';
import { makeGetProfileByUsername } from './selectors';
import { Profile } from './types';
import { formatDate } from '../utils';

type Props = {
  username: string;
  citationDate: string;
  displayType: 'block' | 'line';
};

const DEFAULT_AVATAR_URL = 'https://static.productionready.io/images/smiley-cyrus.jpg';

export const AuthorCitation: React.FC<Props> = ({ username, citationDate }) => {
  const getAuthorByUsername = useMemo(makeGetProfileByUsername, []);
  const author: Profile | undefined = useSelector((state: RootState) =>
    getAuthorByUsername(state, username),
  );

  if (!author) return null;

  const avatarUrl = author.image || DEFAULT_AVATAR_URL;

  return (
    <Card transparent style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Thumbnail style={{ height: 16, width: 16 }} source={{ uri: avatarUrl }} />
      <Text style={{ marginLeft: 5 }}>{author.username}</Text>
      <Text style={{ marginLeft: 5, color: 'lightgray' }}>
        {formatDate(new Date(citationDate))}
      </Text>
    </Card>
  );
};
