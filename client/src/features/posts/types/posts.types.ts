export type Post = {
  id: string;
  title: string;
};

export type NewPost = Omit<Post, 'id'>;
