import { ApiRoutes } from "@/constants";
import { toUrl } from "@/utils";
import { CursorQueryParams, PageQueryParams, Scheme, User } from ".";
import {
  useDelete,
  useFetch,
  useGetPage,
  useLoadMore,
  usePost,
  useUpdate,
} from "./hooks";

export interface Post extends Scheme {
  userId: number;
  title: string;
  content: string;
}

export interface PostWithUser extends Post {
  user: User;
}

export const useGetPost = (id?: number) => {
  return useFetch<Post>(toUrl(ApiRoutes.Post, { id }));
};

export const useGetPosts = (
  params: Pick<PageQueryParams, "sort" | "order">
) => {
  return useFetch<PostWithUser[]>(toUrl(ApiRoutes.Post), params);
};

export const useGetPostsByPage = (params: PageQueryParams) => {
  return useGetPage<PostWithUser[]>(toUrl(ApiRoutes.Post), params);
};

export const useGetPostsByCursor = (params: CursorQueryParams) => {
  return useLoadMore<PostWithUser[]>(toUrl(ApiRoutes.Post), params);
};

export type PostCreate = Omit<Post, "id">;

export const useCreatePost = (params?: PageQueryParams | CursorQueryParams) => {
  return usePost<Post[], PostCreate, number>(toUrl(ApiRoutes.Post), params, {
    meta: { successMessage: "Post created successfully" },
  });
};

export type PostUpdate = Post;

export const useUpdatePost = () => {
  return useUpdate<Post[], PostUpdate>(
    toUrl(ApiRoutes.Post),
    undefined,
    {
      meta: { successMessage: "Post updated successfully" },
    },
    (old, data) => {
      const finded = old.find((item) => item.id === data.id);
      if (!finded) return old;
      finded.title = data.title;
      finded.content = data.content;
      return old.map((item) => (item.id === data.id ? finded : item));
    }
  );
};

export const useDeletePost = () => {
  return useDelete<Post[], number>(
    toUrl(ApiRoutes.Post),
    undefined,
    {
      meta: { successMessage: "Post deleted successfully" },
    },
    (old, id) => {
      return old.filter((item) => item.id !== id);
    }
  );
};
