import api from '../api/client';
import { ArticleWithAuthor } from './types';

type MultipleArticlesResponse = {
  articles: ArticleWithAuthor[];
  articlesCount: number;
};

type SingleArticleResponse = {
  article: ArticleWithAuthor;
};

export const fetchArticles = () =>
  api.get<MultipleArticlesResponse>('/articles').then((response) => response.data.articles);

export const fetchArticleBySlug = (slug: string) =>
  api.get<SingleArticleResponse>(`/articles/${slug}`).then((response) => response.data.article);
