import React, { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { RootState } from '../store';
import { makeGetArticleBySlug, Article } from '../articles';
import { formatDate } from '../utils';

type Props = {
  slug: string;
  navigateToArticleDetailScreen(slug: string): void;
};

export const ArticlePreview: React.FC<Props> = ({ slug, navigateToArticleDetailScreen }) => {
  const getArticleBySlug = useMemo(makeGetArticleBySlug, []);
  const article: Article | undefined = useSelector((state: RootState) =>
    getArticleBySlug(state, slug),
  );

  const handlePreviewPress = useCallback(() => navigateToArticleDetailScreen(slug), [
    navigateToArticleDetailScreen,
    slug,
  ]);

  return article ? (
    <Container onPress={handlePreviewPress}>
      <>
        <TagList>Tag1</TagList>
        <Content>
          <Left>
            <Title numberOfLines={2}>{article.title}</Title>
            <Description numberOfLines={1}>{article.description}</Description>
          </Left>
          <Right>
            <AuthorContainer>
              <AuthorAvatar
                source={{
                  uri:
                    article.author.image ||
                    'https://static.productionready.io/images/smiley-cyrus.jpg',
                }}
              />
              <AuthorName>{article.author.username}</AuthorName>
              <CreatedDate>{formatDate(new Date(article.createdAt))}</CreatedDate>
            </AuthorContainer>
          </Right>
        </Content>
      </>
    </Container>
  ) : null;
};

const CreatedDate = styled.Text`
  color: lightgray;
  font-size: 10px;
`;

const AuthorName = styled.Text`
  color: black;
  margin-top: 10px;
  font-size: 16px;
`;

const AuthorAvatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

const AuthorContainer = styled.View`
  align-items: flex-end;
`;

const Description = styled.Text`
  color: lightgray;
  margin-top: 5px;
  font-size: 16px;
`;

const Title = styled.Text`
  color: black;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 20px;
`;

const Left = styled.View``;
const Right = styled.View``;

const Content = styled.View`
  width: 100%;
  margin-top: 5px;
  flex-direction: row;
  justify-content: space-between;
`;

const TagList = styled.Text``;

const Container = styled.TouchableOpacity`
  height: 180px;
  border-top-width: 0.5px;
  border-bottom-width: 0.5px;
  border-color: gray;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  align-items: flex-start;
`;
