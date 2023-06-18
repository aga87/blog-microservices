import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { randomBytes } from 'crypto';

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

// COMMENTS Microservice

type Comment = {
  id: string;
  content: string;
};

type CommentsByPostId = {
  [key: string]: Comment[];
};

const commentsByPostId: CommentsByPostId = {}; // Store comments in memory for demo purposes

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  if (!content || typeof content !== 'string')
    return res.status(400).send({ error: 'Content string is required' });
  const comment = { id: commentId, content };
  const comments = commentsByPostId[req.params.id] || [];
  comments.push(comment);
  commentsByPostId[req.params.id] = comments;
  res.status(201).send(comment);
});

// Listen for connections
const { PORT } = process.env;
const port = PORT || 4001;
app.listen(PORT, () => console.log(`Listening on port ${port}...`));
