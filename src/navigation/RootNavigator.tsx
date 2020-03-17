import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { HomeScreen } from '../home';
import { ArticleDetailScreen } from '../article-detail';
import { Routes } from './Routes';

const Stack = createStackNavigator();

const RootNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={Routes.Home} component={HomeScreen} />
      <Stack.Screen
        name={Routes.ArticleDetail}
        component={ArticleDetailScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
          title: 'Article',
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default RootNavigator;
