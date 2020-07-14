import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import { ArticleList } from "./ArticleList";
import { loadMoreArticlesList } from "./slice";

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch(loadMoreArticlesList());
    }, [dispatch])
  );

  const handleEndReached = useCallback(() => {
    dispatch(loadMoreArticlesList());
  }, [dispatch]);

  return <ArticleList onEndReached={handleEndReached} />;
};

export default HomeScreen;
