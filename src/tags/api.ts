import api from "../api";

type TagsResponse = {
  tags: string[];
};

export const fetchTags = () =>
  api.get<TagsResponse>(`/tags`).then((response) => response.data.tags);
