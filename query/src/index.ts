import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import type { Post, Event } from './types';

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

const posts: Post[] = [];

app.get('/posts', (req, res) => {
  res.send(posts);
});

const handleEvent = (event: Event) => {
  const { type, data } = event;

  if (type === 'PostCreated') {
    const { id, title } = data;
    const post = { id, title, comments: [] };
    posts.unshift(post); // newest on top
  }

  if (type === 'CommentCreated') {
    const { postId, ...comment } = data;
    const post = posts.find((post) => post.id === postId);
    if (post) {
      post.comments.push(comment);
    }
  }

  if (type === 'CommentUpdated') {
    const { id, postId, status } = data;

    const post = posts.find((post) => post.id === postId);

    const comment = post?.comments.find((comment) => comment.id === id);

    if (comment) {
      comment.status = status;
    }
  }
};

app.post('/events', (req, res) => {
  const event = req.body;
  handleEvent(event);
  return res.send({});
});

// Listen for connections
const { PORT } = process.env;
const port = PORT || 4002;

app.listen(port, async () => {
  console.log(`Listening on port ${port}...`);
  // Request all events when the query service comes online
  try {
    const { EVENT_BUS_URL } = process.env;
    const res = await axios.get(
      EVENT_BUS_URL || 'http://localhost:4005/events'
    );

    for (let event of res.data) {
      console.log('Processing event:', event.type);

      handleEvent(event);
    }
  } catch (err: any) {
    console.log(err.message);
  }
});
