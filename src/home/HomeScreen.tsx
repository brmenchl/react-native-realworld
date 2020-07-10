import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { useDispatch } from "react-redux";

import { ArticleList } from "./ArticleList";
import { loadHomeScreen } from "./redux";

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch(loadHomeScreen());
    }, [dispatch])
  );

  return <ArticleList />;
};

export default HomeScreen;
