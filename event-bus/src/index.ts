import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';

dotenv.config();
const app: Application = express();

app.use(express.json());

const { CLIENT_URL } = process.env;
const host = CLIENT_URL || 'http://localhost:3000';
app.use(
  cors({
    origin: host
  })
);

app.get('/ping', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.post('/events', (req, res) => {
  const event = req.body;

  const {
    POSTS_SERVICE_URL,
    COMMENTS_SERVICE_URL,
    QUERY_SERVICE_URL,
    MODERATION_SERVICE_URL
  } = process.env;

  axios
    .post(POSTS_SERVICE_URL || 'http://localhost:4000/events', event)
    .catch((err) => {
      console.log(err.message);
    });

  axios
    .post(COMMENTS_SERVICE_URL || 'http://localhost:4001/events', event)
    .catch((err) => {
      console.log(err.message);
    });

  axios
    .post(QUERY_SERVICE_URL || 'http://localhost:4002/events', event)
    .catch((err) => {
      console.log(err.message);
    });

  axios
    .post(MODERATION_SERVICE_URL || 'http://localhost:4003/events', event)
    .catch((err) => {
      console.log(err.message);
    });

  return res.send({ status: 'OK' });
});

const { PORT } = process.env;
const port = PORT || 4005;
app.listen(port, () => console.log(`Listening on port ${port}...`));
