export type Comment = {
  id: string;
  content: string;
};

export type NewComment = Omit<Comment, 'id'>;
