import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";

import { useThunkDispatch } from "../app/store";
import { ArticleList } from "./ArticleList";
import { loadMoreArticlesList } from "./slice";

const HomeScreen: React.FC = () => {
  const dispatch = useThunkDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch(loadMoreArticlesList());
      dispatch(loadTags());
    }, [dispatch])
  );

  const handleEndReached = useCallback(() => {
    dispatch(loadMoreArticlesList());
  }, [dispatch]);

  return <ArticleList onEndReached={handleEndReached} />;
};

export default HomeScreen;
