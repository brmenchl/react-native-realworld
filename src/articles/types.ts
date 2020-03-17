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
  author: Author;
};

// TODO: extract eventually
type Author = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};
