import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ArticleDetailScreen } from '../article-detail';
import { HomeScreen } from '../home';
import { getIsLoggedIn, LoginScreen, RegisterScreen } from '../auth';
import { ProfileScreen } from '../profile';
import { DrawerContent, DrawerScreenContainer } from './DrawerContent';
import { Routes } from './Routes';

const RootStack = createStackNavigator();

const Drawer = createDrawerNavigator();

export const DrawerNavigator: React.FC = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);

  const withScreenContainer = (Screen: React.ComponentType) => (props: any) => (
    <DrawerScreenContainer>
      <Screen {...props} />
    </DrawerScreenContainer>
  );

  return (
    <Drawer.Navigator
      initialRouteName={Routes.Home}
      drawerContent={(props) => <DrawerContent {...props} isLoggedIn={isLoggedIn} />}
    >
      {isLoggedIn ? (
        <Drawer.Screen name={Routes.Profile} component={withScreenContainer(ProfileScreen)} />
      ) : (
        <>
          <Drawer.Screen name={Routes.Login} component={withScreenContainer(LoginScreen)} />
          <Drawer.Screen name={Routes.Register} component={withScreenContainer(RegisterScreen)} />
        </>
      )}
      <Drawer.Screen name={Routes.Home} component={withScreenContainer(HomeScreen)} />
    </Drawer.Navigator>
  );
};

const RootNavigator: React.FC = () => (
  <SafeAreaProvider>
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Home" component={DrawerNavigator} />
        <RootStack.Screen
          name={Routes.ArticleDetail}
          component={ArticleDetailScreen}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: '#5cb85c' },
            headerTintColor: 'white',
            cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
            title: 'Article',
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
);

export default RootNavigator;
