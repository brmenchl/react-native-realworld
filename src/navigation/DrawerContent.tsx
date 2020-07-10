import {
  DrawerContentScrollView,
  DrawerContentOptions,
  DrawerContentComponentProps,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  useNavigation,
  DrawerActions,
  useRoute,
} from "@react-navigation/native";
import {
  Container,
  Left,
  Icon,
  Header,
  Body,
  Right,
  Title,
  Button,
} from "native-base";
import React, { useCallback } from "react";
import { useSafeArea } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

import { auth } from "../auth";
import { BigAvatar, Profile } from "../profiles";

export const DrawerContent: React.FC<
  DrawerContentComponentProps<DrawerContentOptions> & {
    isLoggedIn: boolean;
    profile?: Profile;
  }
> = ({ isLoggedIn, profile, ...props }) => {
  const dispatch = useDispatch();
  const handleLogOutPress = useCallback(() => {
    dispatch(auth.actions.logOut());
  }, [dispatch]);

  return (
    <DrawerContentScrollView {...props}>
      {isLoggedIn && <BigAvatar profile={profile!} />}
      <DrawerItemList {...props} />
      {isLoggedIn && (
        <DrawerItem label="Sign Out" onPress={handleLogOutPress} />
      )}
    </DrawerContentScrollView>
  );
};

export const DrawerScreenContainer: React.FC = ({ children }) => {
  const insets = useSafeArea();
  const navigation = useNavigation();
  const route = useRoute();
  const onPressMenuIcon = useCallback(
    () => navigation.dispatch(DrawerActions.toggleDrawer),
    [navigation]
  );

  return (
    <Container style={{ marginTop: insets.top }}>
      <Header
        iosBarStyle="light-content"
        androidStatusBarColor="#5cb85c"
        style={{ backgroundColor: "#5cb85c" }}
      >
        <Left>
          <Button transparent onPress={onPressMenuIcon}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>{route.name}</Title>
        </Body>
        <Right />
      </Header>
      {children}
    </Container>
  );
};
