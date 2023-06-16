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

// POSTS Microservice

type Post = {
  id: string;
  title: string;
};

const posts: Post[] = []; // Store posts in memory for demo purposes

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  if (!title || typeof title !== 'string')
    return res.status(400).send({ error: 'Title string is required.' });

  const post = { id, title };
  posts.push(post);

  res.status(201).send(post);
});

// Listen for connections
const { PORT } = process.env;
const port = PORT || 4000;
app.listen(PORT, () => console.log(`Listening on port ${port}...`));
