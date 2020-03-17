import React from 'react';
import { useSelector } from 'react-redux';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { identity } from 'ramda';
import { getAllArticleSlugs } from '../articles';
import { ArticlePreview } from './ArticlePreview';

const renderItem = ({ item }: ListRenderItemInfo<string>) => <ArticlePreview slug={item} />;

export const ArticleList: React.FC = () => {
  const slugs = useSelector(getAllArticleSlugs);

  return <FlatList data={slugs} keyExtractor={identity} renderItem={renderItem} />;
};
