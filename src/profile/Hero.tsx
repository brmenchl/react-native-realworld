import { useNavigation } from "@react-navigation/native";
import { Button, H1 } from "native-base";
import React, { useCallback } from "react";
import { View, Text } from "react-native";

import { Routes } from "../navigation";
import { Profile, BigAvatar } from "../profiles";

type Props = {
  profile: Profile;
};

export const Hero: React.FC<Props> = ({ profile }) => {
  const navigation = useNavigation();

  const navigateToSettings = useCallback(() => {
    navigation.navigate(Routes.Settings);
  }, [navigation]);

  return (
    <View>
      <BigAvatar profile={profile} />
      <H1>{profile.username}</H1>
      <Button onPress={navigateToSettings}>
        <Text>Edit Profile Settings</Text>
      </Button>
    </View>
  );
};
