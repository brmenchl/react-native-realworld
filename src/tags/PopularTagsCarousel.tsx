import * as React from "react";
import { useCallback } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { useSelector } from "react-redux";

import { useThunkDispatch } from "../app/store";
import { filterArticleListByTag } from "../home/slice";
import PopularTagCard from "./PopularTagCard";
import { getAllTags } from "./slice";

const keyExtractor = (tag: string) => tag;

export const PopularTagsCarousel: React.FC = () => {
  const tags = useSelector(getAllTags);
  const dispatch = useThunkDispatch();

  const renderPopularTagCard: ListRenderItem<string> = useCallback(
    ({ item: tag }) => {
      const handlePress = () => {
        dispatch(filterArticleListByTag(tag));
      };
      return <PopularTagCard tag={tag} onPress={handlePress} />;
    },
    []
  );

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={tags}
      keyExtractor={keyExtractor}
      renderItem={renderPopularTagCard}
    />
  );
};
