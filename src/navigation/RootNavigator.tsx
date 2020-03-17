import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ArticleDetailScreen } from '../article-detail';
import { Routes } from './Routes';
import { DrawerToggle } from './DrawerToggle';
import { HomeScreen } from '../home';
import { getIsLoggedIn, LoginScreen, RegisterScreen } from '../auth';
import { ProfileScreen } from '../profile';

const RootStack = createStackNavigator();

const Drawer = createDrawerNavigator();

export const DrawerNavigator: React.FC = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    <Drawer.Navigator>
      {isLoggedIn ? (
        <Drawer.Screen name={Routes.Profile} component={ProfileScreen} />
      ) : (
        <>
          <Drawer.Screen name={Routes.Login} component={LoginScreen} />
          <Drawer.Screen name={Routes.Register} component={RegisterScreen} />
        </>
      )}
      <Drawer.Screen name={Routes.Home} component={HomeScreen} />
    </Drawer.Navigator>
  );
};

const RootNavigator: React.FC = () => (
  <NavigationContainer>
    <RootStack.Navigator>
      <RootStack.Screen
        name="Home"
        component={DrawerNavigator}
        options={{ headerLeft: () => <DrawerToggle /> }}
      />
      <RootStack.Screen
        name={Routes.ArticleDetail}
        component={ArticleDetailScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
          title: 'Article',
        }}
      />
    </RootStack.Navigator>
  </NavigationContainer>
);

export default RootNavigator;
