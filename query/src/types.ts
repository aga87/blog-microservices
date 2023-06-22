type Comment = {
  id: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
};

export type Post = {
  id: string;
  title: string;
  comments: Comment[];
};

type PostCreatedEvent = {
  type: 'PostCreated';
  data: {
    id: string;
    title: string;
  };
};

type CommentEventData = {
  postId: string;
  id: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
};

type CommentCreatedEvent = {
  type: 'CommentCreated';
  data: CommentEventData;
};

type CommentUpdatedEvent = {
  type: 'CommentUpdated';
  data: CommentEventData;
};

export type Event =
  | PostCreatedEvent
  | CommentCreatedEvent
  | CommentUpdatedEvent;
