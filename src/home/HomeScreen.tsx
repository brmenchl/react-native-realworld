import React from 'react';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { loadHomeScreen } from './redux';
import { ArticleList } from './ArticleList';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch(loadHomeScreen());
    }, [dispatch]),
  );

  return <ArticleList />;
};

export default HomeScreen;
