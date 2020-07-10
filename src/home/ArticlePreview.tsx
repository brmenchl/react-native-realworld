import { Card, CardItem, Text, Body, H1 } from "native-base";
import React, { useMemo, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import { RootState } from "../app/rootReducer";
import { makeGetArticleBySlug, Article } from "../articles";
import { AuthorCitation } from "../profiles";

type Props = {
  slug: string;
  navigateToArticleDetailScreen(slug: string): void;
};

export const ArticlePreview: React.FC<Props> = ({
  slug,
  navigateToArticleDetailScreen,
}) => {
  const getArticleBySlug = useMemo(makeGetArticleBySlug, []);
  const article: Article | undefined = useSelector((state: RootState) =>
    getArticleBySlug(state, slug)
  );

  const handlePreviewPress = useCallback(
    () => navigateToArticleDetailScreen(slug),
    [navigateToArticleDetailScreen, slug]
  );

  return article ? (
    <TouchableOpacity onPress={handlePreviewPress}>
      <Card>
        <CardItem header>
          <H1>{article.title}</H1>
        </CardItem>
        <CardItem>
          <Text numberOfLines={1}>{article.description}</Text>
        </CardItem>
        <CardItem footer>
          <Body>
            <AuthorCitation
              displayType="line"
              username={article.authorUsername}
              citationDate={article.createdAt}
            />
            <Text>{article.tagList.join(" ")}</Text>
          </Body>
        </CardItem>
      </Card>
    </TouchableOpacity>
  ) : null;
};
