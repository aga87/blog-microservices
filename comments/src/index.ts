import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { randomBytes } from 'crypto';
import axios from 'axios';

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

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const postId = req.params.id;

  if (!content || typeof content !== 'string')
    return res.status(400).send({ error: 'Content string is required' });
  const comment = { id: commentId, content };
  const comments = commentsByPostId[req.params.id] || [];
  comments.push(comment);
  commentsByPostId[postId] = comments;

  const { EVENT_BUS_URL } = process.env;
  await axios.post(EVENT_BUS_URL || 'http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId
    }
  });

  return res.status(201).send(comment);
});

app.post('/events', (req, res) => {
  console.log('Event Received', req.body.type);
  return res.send({});
});

// Listen for connections
const { PORT } = process.env;
const port = PORT || 4001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
