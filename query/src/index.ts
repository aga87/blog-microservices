import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';

dotenv.config();
const app: Application = express();

// Parse application/json
app.use(express.json());

// Set CORS
const { CLIENT_URL } = process.env;
const host = CLIENT_URL || 'http://localhost:3000';
app.use(
  cors({
    origin: host
  })
);

// Test route
app.get('/ping', (req: Request, res: Response) => {
  res.send('Hello World');
});

type Comment = {
  id: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
};

type Post = {
  id: string;
  title: string;
  comments: Comment[];
};

const posts: Post[] = [];

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;
    const post = { id, title, comments: [] };
    posts.unshift(post); // newest on top
  }

  if (type === 'CommentCreated') {
    const { postId, ...comment } = data;
    const post = posts.filter((post) => post.id === postId);
    post[0].comments.push(comment);
  }

  return res.send({});
});

// Listen for connections
const { PORT } = process.env;
const port = PORT || 4002;
app.listen(port, () => console.log(`Listening on port ${port}...`));
