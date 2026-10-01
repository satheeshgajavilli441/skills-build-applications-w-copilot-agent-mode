import express from 'express';
import Activity from './models/activity.js';
import User from './models/user.js';

const app = express();

app.use(express.json());

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