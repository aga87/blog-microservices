import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
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

// COMMENT MODERATION Microservice
app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;

    // (Assume comment moderation is more complex / not instantaneous)
    const status = content.includes('orange') ? 'rejected' : 'approved';

    const { EVENT_BUS_URL } = process.env;
    await axios.post(EVENT_BUS_URL || 'http://event-bus-srv:4005/events', {
      type: 'CommentModerated',
      data: {
        id,
        postId,
        status,
        content
      }
    });
  }

  res.send({});
});

// Listen for connections
const { PORT } = process.env;
const port = PORT || 4003;
app.listen(port, () => console.log(`Listening on port ${port}...`));
