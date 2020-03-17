import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import Svg, { Rect } from 'react-native-svg';
import { useNavigation, DrawerActions } from '@react-navigation/native';

export const DrawerToggle: React.FC = () => {
  const navigation = useNavigation();
  const toggleDrawer = useCallback(() => navigation.dispatch(DrawerActions.toggleDrawer()), [
    navigation,
  ]);

  return (
    <Button onPress={toggleDrawer} hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}>
      <Svg stroke="black" width={20} height={20} viewBox="0 0 50 50">
        <Rect y="3" width="50" height="2" />
        <Rect y="17" width="50" height="2" />
        <Rect y="31" width="50" height="2" />
        <Rect y="45" width="50" height="2" />
      </Svg>
    </Button>
  );
};

const Button = styled.TouchableOpacity`
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;
