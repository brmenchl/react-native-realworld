import api from '../api/client';
import { Article } from './types';

type MultipleArticlesResponse = {
  articles: Article[];
  articlesCount: number;
};

export const fetchArticles = () =>
  api.get<MultipleArticlesResponse>('/articles').then((response) => response.data.articles);
