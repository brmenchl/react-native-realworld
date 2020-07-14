import { CardItem } from "native-base";
import * as React from "react";
import { useCallback } from "react";
import { FlatList, ListRenderItem } from "react-native";

import { useThunkDispatch } from "../app/store";
import { filterArticleListByTag } from "../home/slice";
import TagCard from "./TagCard";

type Props = {
  tags: string[];
};

const keyExtractor = (tag: string) => tag;

export const TagCarousel: React.FC<Props> = ({ tags }) => {
  const dispatch = useThunkDispatch();
  const renderTagCard: ListRenderItem<string> = useCallback(({ item: tag }) => {
    const handlePress = () => {
      dispatch(filterArticleListByTag(tag));
    };
    return <TagCard tag={tag} onPress={handlePress} />;
  }, []);

  return (
    <CardItem>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={tags}
        keyExtractor={keyExtractor}
        renderItem={renderTagCard}
      />
    </CardItem>
  );
};
