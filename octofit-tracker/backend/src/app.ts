import express from 'express';
import Activity from './models/activity.js';
import User from './models/user.js';

const app = express();

app.use(express.json());

const codespaceName = process.env.CODESPACE_NAME;
const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
]);

app.use((request, response, next) => {
  const origin = request.get('Origin');

  if (origin && allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Vary', 'Origin');
  }

  if (request.method === 'OPTIONS') {
    response.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT,PATCH,DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    response.sendStatus(204);
    return;
  }

  next();
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/users', async (_request, response) => {
  response.json(await User.find().lean());
});

app.get('/api/activities', async (_request, response) => {
  response.json(await Activity.find().lean());
});

export default app;