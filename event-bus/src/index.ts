import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';

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

const { PORT } = process.env;
const port = PORT || 4005;
app.listen(port, () => console.log(`Listening on port ${port}...`));
