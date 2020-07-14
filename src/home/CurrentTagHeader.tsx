import { H1 } from "native-base";
import * as React from "react";
import { useCallback } from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

import { useThunkDispatch } from "../app/store";
import { getArticleListFilterTag, clearTagFilter } from "./slice";

export const CurrentTagHeader: React.FC = () => {
  const currentTag = useSelector(getArticleListFilterTag);
  const dispatch = useThunkDispatch();
  const handlePress = useCallback(() => {
    dispatch(clearTagFilter());
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#5cb85c",
        padding: 5,
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={handlePress}>
        <H1 style={{ color: "white" }}>
          {currentTag ? `#${currentTag}` : "Global Feed"}
        </H1>
      </TouchableOpacity>
    </View>
  );
};
