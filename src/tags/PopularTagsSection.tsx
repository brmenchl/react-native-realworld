import { Card, CardItem, H3 } from "native-base";
import * as React from "react";
import { useSelector } from "react-redux";

import { TagCarousel } from "./TagCarousel";
import { getAllTags } from "./slice";

export const PopularTagsSection: React.FC = () => {
  const tags = useSelector(getAllTags);

  return (
    <Card transparent>
      <CardItem header>
        <H3>Popular Tags</H3>
      </CardItem>
      <TagCarousel tags={tags} />
    </Card>
  );
};
