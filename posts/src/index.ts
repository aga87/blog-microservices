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

// POSTS Microservice

type Post = {
  id: string;
  title: string;
};

const posts: Post[] = []; // Store posts in memory for demo purposes

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  if (!title || typeof title !== 'string')
    return res.status(400).send({ error: 'Title string is required.' });

  const post = { id, title };
  posts.push(post);

  const { EVENT_BUS_URL } = process.env;
  await axios.post(EVENT_BUS_URL || 'http://localhost:4005/events', {
    type: 'PostCreated',
    data: {
      post
    }
  });

  return res.status(201).send(post);
});

app.post('/events', (req, res) => {
  console.log('Received Event', req.body.type);
  return res.send({});
});

// Listen for connections
const { PORT } = process.env;
const port = PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
