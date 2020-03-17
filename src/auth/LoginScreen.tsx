import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { signIn } from './redux';

export const LoginScreen: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signIn({ email: 'brad@example.com', password: 'password' }));
  }, [dispatch]);
  return <Text>LOG IN</Text>;
};
