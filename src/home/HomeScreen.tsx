import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { useDispatch } from "react-redux";

import { loadArticles } from "../articles";
import { ArticleList } from "./ArticleList";

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch(loadArticles());
    }, [dispatch])
  );

  return <ArticleList />;
};

export default HomeScreen;
