import api from '../api/client';
import { Article } from './types';

type MultipleArticlesResponse = {
  articles: Article[];
  articlesCount: number;
};

type SingleArticleResponse = {
  article: Article;
};

export const fetchArticles = () =>
  api.get<MultipleArticlesResponse>('/articles').then((response) => response.data.articles);

export const fetchArticleBySlug = (slug: string) =>
  api.get<SingleArticleResponse>(`/articles/${slug}`).then((response) => response.data.article);
