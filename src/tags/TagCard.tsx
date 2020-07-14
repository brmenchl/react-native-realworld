import { Card, Body, Text, CardItem } from "native-base";
import * as React from "react";

type Props = {
  tag: string;
  onPress(): void;
};

const TagCard: React.FC<Props> = ({ tag, onPress }) => (
  <Card>
    <CardItem button onPress={onPress}>
      <Body>
        <Text>{tag}</Text>
      </Body>
    </CardItem>
  </Card>
);

export default TagCard;
