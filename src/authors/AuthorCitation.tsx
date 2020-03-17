import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { RootState } from '../store';
import { makeGetAuthorByUsername } from './selectors';
import { Author } from './types';
import { formatDate } from '../utils';

type Props = {
  username: string;
  citationDate: string;
  displayType: 'block' | 'line';
};

const DEFAULT_AVATAR_URL = 'https://static.productionready.io/images/smiley-cyrus.jpg';

export const AuthorCitation: React.FC<Props> = ({ username, citationDate, displayType }) => {
  const getAuthorByUsername = useMemo(makeGetAuthorByUsername, []);
  const author: Author | undefined = useSelector((state: RootState) =>
    getAuthorByUsername(state, username),
  );

  if (!author) return null;

  const avatarUrl = author.image || DEFAULT_AVATAR_URL;

  return displayType === 'block' ? (
    <CitationBlock>
      <Avatar size={80} source={{ uri: avatarUrl }} />
      <AuthorNameBlock>{author.username}</AuthorNameBlock>
      <CitationDateBlock>{formatDate(new Date(citationDate))}</CitationDateBlock>
    </CitationBlock>
  ) : (
    <CitationInline>
      <Avatar size={16} source={{ uri: avatarUrl }} />
      <AuthorNameInline>{author.username}</AuthorNameInline>
      <CitationDateInline>{formatDate(new Date(citationDate))}</CitationDateInline>
    </CitationInline>
  );
};

const CitationDateBlock = styled.Text`
  color: lightgray;
  font-size: 10px;
`;

const CitationDateInline = styled.Text`
  color: lightgray;
  margin-left: 5px;
  font-size: 12px;
`;

const AuthorNameInline = styled.Text`
  color: black;
  margin-left: 5px;
  font-size: 12px;
`;

const AuthorNameBlock = styled.Text`
  color: black;
  margin-top: 10px;
  font-size: 16px;
`;

const Avatar = styled.Image<{ size: number }>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
`;

const CitationInline = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
`;

const CitationBlock = styled.View`
  align-items: flex-end;
`;
