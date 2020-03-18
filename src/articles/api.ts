import api from '../api';
import { createProfile, Profile } from '../profiles';
import { Article } from './types';

type MultipleArticlesResponse = {
  articles: ArticleWithAuthor[];
  articlesCount: number;
};

type SingleArticleResponse = {
  article: ArticleWithAuthor;
};

type ArticleWithAuthor = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
};

const createArticle = ({ author, ...rest }: ArticleWithAuthor): Article => ({
  ...rest,
  authorUsername: author.username,
});

const parseArticle = (articleWithAuthor: ArticleWithAuthor) => ({
  article: createArticle(articleWithAuthor),
  profile: createProfile(articleWithAuthor.author),
});

export const fetchArticles = () =>
  api
    .get<MultipleArticlesResponse>('/articles')
    .then((response) => response.data.articles.map(parseArticle));

export const fetchArticleBySlug = (slug: string) =>
  api
    .get<SingleArticleResponse>(`/articles/${slug}`)
    .then((response) => parseArticle(response.data.article));
