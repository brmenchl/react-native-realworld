import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getIsLoggedIn } from './selectors';
import { Routes } from '../navigation';

export const useAuthOnly = () => {
  const navigation = useNavigation();
  const isLoggedIn = useSelector(getIsLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate(Routes.Login);
    }
  }, [isLoggedIn, navigation]);
};

export const useUnAuthOnly = () => {
  const navigation = useNavigation();
  const isLoggedIn = useSelector(getIsLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate(Routes.Home);
    }
  }, [isLoggedIn, navigation]);
};
