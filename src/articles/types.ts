import { Author } from '../authors';

export type Article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[]; // TODO: maybe move somewhere
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  authorUsername: string;
};

export type ArticleWithAuthor = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[]; // TODO: maybe move somewhere
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
};

export const normalizeArticle = ({ author, ...rest }: ArticleWithAuthor) => ({
  ...rest,
  authorUsername: author.username,
});
