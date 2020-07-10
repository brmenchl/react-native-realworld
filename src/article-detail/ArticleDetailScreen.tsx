import { useFocusEffect, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Content } from "native-base";
import React from "react";
import { useDispatch } from "react-redux";

import { ArticleDetail } from "./ArticleDetail";
import { loadArticleDetailScreen } from "./redux";

export const ArticleDetailScreenName = "ArticleDetail";

export type ArticleDetailScreenParamList = {
  [ArticleDetailScreenName]: {
    slug: string;
  };
};

type Props = {
  navigation: StackNavigationProp<
    ArticleDetailScreenParamList,
    typeof ArticleDetailScreenName
  >;
  route: RouteProp<
    ArticleDetailScreenParamList,
    typeof ArticleDetailScreenName
  >;
};

const ArticleDetailScreen: React.FC<Props> = ({ route }) => {
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(loadArticleDetailScreen(route.params.slug));
    }, [dispatch, route.params.slug])
  );

  return (
    <Content padder>
      <ArticleDetail slug={route.params.slug} />
    </Content>
  );
};

export default ArticleDetailScreen;
