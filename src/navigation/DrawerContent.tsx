import React, { useCallback } from 'react';
import {
  DrawerContentScrollView,
  DrawerContentOptions,
  DrawerContentComponentProps,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';
import { Container, Left, Icon, Content, Header, Body, Right, Title, Button } from 'native-base';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useSafeArea } from 'react-native-safe-area-context';
import { auth } from '../auth';

export const DrawerContent: React.FC<DrawerContentComponentProps<DrawerContentOptions> & {
  isLoggedIn: boolean;
}> = ({ isLoggedIn, ...props }) => {
  const dispatch = useDispatch();
  const handleLogOutPress = useCallback(() => {
    dispatch(auth.actions.logOut());
  }, [dispatch]);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {isLoggedIn && <DrawerItem label="Sign Out" onPress={handleLogOutPress} />}
    </DrawerContentScrollView>
  );
};

export const DrawerScreenContainer: React.FC = ({ children }) => {
  const navigation = useNavigation();
  const onPressMenuIcon = useCallback(() => navigation.dispatch(DrawerActions.toggleDrawer), [
    navigation,
  ]);
  const insets = useSafeArea();

  return (
    <Container style={{ marginTop: insets.top }}>
      <Header
        iosBarStyle="light-content"
        androidStatusBarColor="#5cb85c"
        style={{ backgroundColor: '#5cb85c' }}
      >
        <Left>
          <Button transparent onPress={onPressMenuIcon}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>test</Title>
        </Body>
        <Right />
      </Header>
      <Content>{children}</Content>
    </Container>
  );
};
