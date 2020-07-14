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
        backgroundColor: currentTag ? "#5cb85c" : "transparent",
        padding: 5,
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={handlePress}>
        {currentTag ? <H1 style={{ color: "white" }}>#{currentTag}</H1> : null}
      </TouchableOpacity>
    </View>
  );
};
