import { useNavigation } from "@react-navigation/native";
import { H1, H3, Text } from "native-base";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../app/rootReducer";
import { makeGetArticleBySlug, Article } from "../articles";
import { AuthorCitation } from "../profiles";

type Props = {
  slug: string;
};

export const ArticleDetail: React.FC<Props> = ({ slug }) => {
  const navigation = useNavigation();
  const getArticleBySlug = useMemo(makeGetArticleBySlug, []);
  const article: Article | undefined = useSelector((state: RootState) =>
    getArticleBySlug(state, slug)
  );
  if (article) {
    navigation.setOptions({ title: article.title });
  }

  return article ? (
    <>
      <H1>{article.title}</H1>
      <H3 style={{ marginTop: 10, color: "gray" }}>{article.description}</H3>
      <AuthorCitation
        displayType="line"
        username={article.authorUsername}
        citationDate={article.createdAt}
      />
      <Text>{article.body}</Text>
    </>
  ) : null;
};
