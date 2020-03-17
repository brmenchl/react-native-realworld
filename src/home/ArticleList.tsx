import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { identity } from 'ramda';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../navigation';
import { getAllArticleSlugs } from '../articles';
import { ArticlePreview } from './ArticlePreview';

export const ArticleList: React.FC = () => {
  const slugs = useSelector(getAllArticleSlugs);
  const navigation = useNavigation();

  const navigateToArticleDetailScreen = useCallback(
    (slug: string) => navigation.navigate(Routes.ArticleDetail, { slug }),
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<string>) => (
      <ArticlePreview slug={item} navigateToArticleDetailScreen={navigateToArticleDetailScreen} />
    ),
    [navigateToArticleDetailScreen],
  );

  return <FlatList data={slugs} keyExtractor={identity} renderItem={renderItem} />;
};
