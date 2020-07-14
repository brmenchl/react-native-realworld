import { useFocusEffect, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Content } from "native-base";
import React from "react";

import { useThunkDispatch } from "../app/store";
import { loadArticle } from "../articles";
import { ArticleDetail } from "./ArticleDetail";

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
  const dispatch = useThunkDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(loadArticle(route.params.slug));
    }, [dispatch, route.params.slug])
  );

  return (
    <Content padder>
      <ArticleDetail slug={route.params.slug} />
    </Content>
  );
};

export default ArticleDetailScreen;
