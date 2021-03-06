import { Thumbnail, Text, Card } from "native-base";
import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../app/rootReducer";
import { formatDate } from "../utils";
import { getProfileByUsername } from "./slice";
import { Profile, DEFAULT_AVATAR_URL } from "./types";

type Props = {
  username: string;
  citationDate: string;
  displayType: "block" | "line";
};

export const AuthorCitation: React.FC<Props> = ({ username, citationDate }) => {
  const author: Profile | undefined = useSelector((state: RootState) =>
    getProfileByUsername(state, username)
  );

  if (!author) return null;

  const avatarUrl = author.image || DEFAULT_AVATAR_URL;

  return (
    <Card transparent style={{ flexDirection: "row", alignItems: "center" }}>
      <Thumbnail
        style={{ height: 16, width: 16 }}
        source={{ uri: avatarUrl }}
      />
      <Text style={{ marginLeft: 5 }}>{author.username}</Text>
      <Text style={{ marginLeft: 5, color: "lightgray" }}>
        {formatDate(new Date(citationDate))}
      </Text>
    </Card>
  );
};
