import { Profile } from '../profiles';

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

export type ArticleWithProfile = { article: Article; profile: Profile };
