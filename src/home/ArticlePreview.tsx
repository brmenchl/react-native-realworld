import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { makeGetArticleBySlug, Article } from '../articles';

export const ArticlePreview: React.FC<{ slug: string }> = ({ slug }) => {
  const getArticleBySlug = useMemo(makeGetArticleBySlug, []);
  const article: Article | undefined = useSelector((state: RootState) =>
    getArticleBySlug(state, slug),
  );

  return article ? (
    <View>
      <Text>{article.title}</Text>
      <Text>{article.body}</Text>
    </View>
  ) : null;
};
