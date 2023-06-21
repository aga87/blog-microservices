export type Comment = {
  id: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
};

export type NewComment = Omit<Comment, 'id' | 'status'>;
