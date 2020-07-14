import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { useSelector } from "react-redux";

import { getUserUsername } from "../auth";
import { getProfileByUsername } from "../profiles";
import { Hero } from "./Hero";

export const ProfileScreenName = "Profile";

export type ProfileScreenParamList = {
  [ProfileScreenName]: {
    username: string;
  };
};

type Props = {
  navigation: StackNavigationProp<
    ProfileScreenParamList,
    typeof ProfileScreenName
  >;
  route: RouteProp<ProfileScreenParamList, typeof ProfileScreenName>;
};

export const ProfileScreen: React.FC<Props> = ({ route }) => {
  const currentUserUsername = useSelector(getUserUsername);
  const profile = useSelector((state) =>
    getProfileByUsername(state, route.params?.username ?? currentUserUsername)
  );

  return <Hero profile={profile} />;
};
