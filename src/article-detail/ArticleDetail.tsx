import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { makeGetArticleBySlug, Article } from '../articles';
import { RootState } from '../store';
import { formatDate } from '../utils';

type Props = {
  slug: string;
};

export const ArticleDetail: React.FC<Props> = ({ slug }) => {
  const navigation = useNavigation();
  const getArticleBySlug = useMemo(makeGetArticleBySlug, []);
  const article: Article | undefined = useSelector((state: RootState) =>
    getArticleBySlug(state, slug),
  );
  if (article) {
    navigation.setOptions({ title: article.title });
  }

  return article ? (
    <Container>
      <Title>{article.title}</Title>
      <Subtitle>{article.description}</Subtitle>
      <AuthorContainer>
        <AuthorAvatar
          source={{
            uri:
              article.author.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
          }}
        />
        <AuthorName>{article.author.username}</AuthorName>
        <ArticleDate>{formatDate(new Date(article.createdAt))}</ArticleDate>
      </AuthorContainer>
      <Body>{article.body}</Body>
    </Container>
  ) : null;
};

const Container = styled.View`
  padding-top: 20px;
  padding-horizontal: 20px;
`;

const Title = styled.Text`
  font-size: 40px;
  color: black;
`;

const Subtitle = styled.Text`
  margin-top: 10px;
  font-size: 30px;
  color: gray;
`;

const AuthorContainer = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
`;

const AuthorAvatar = styled.Image`
  height: 16px;
  width: 16px;
  border-radius: 8px;
`;

const AuthorName = styled.Text`
  margin-left: 5px;
  font-size: 12px;
  color: black;
`;

const ArticleDate = styled.Text`
  margin-left: 5px;
  font-size: 12px;
  color: lightgray;
`;

const Body = styled.Text`
  margin-top: 20px;
  font-size: 20px;
`;
