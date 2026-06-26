import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  Activity,
  connectToDatabase,
  LeaderboardEntry,
  seedDatabase,
  Team,
  User,
  Workout
} from './models';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

const handleCollectionRequest = async <T>(
  res: Response,
  loader: () => Promise<T[]>
) => {
  try {
    const items = await loader();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load collection', details: error });
  }
};

const handleCreateRequest = async <T>(
  req: Request,
  res: Response,
  createFn: (payload: unknown) => Promise<T>
) => {
  try {
    const item = await createFn(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create item', details: error });
  }
};

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker API is running',
    apiBaseUrl
  });
});

app.get('/api/users', (_req, res) => handleCollectionRequest(res, () => User.find().lean()));
app.get('/api/users/', (_req, res) => handleCollectionRequest(res, () => User.find().lean()));
app.post('/api/users', (req, res) => handleCreateRequest(req, res, (payload) => User.create(payload)));
app.post('/api/users/', (req, res) => handleCreateRequest(req, res, (payload) => User.create(payload)));

app.get('/api/teams', (_req, res) => handleCollectionRequest(res, () => Team.find().populate('members').populate('captainId').lean()));
app.get('/api/teams/', (_req, res) => handleCollectionRequest(res, () => Team.find().populate('members').populate('captainId').lean()));
app.post('/api/teams', (req, res) => handleCreateRequest(req, res, (payload) => Team.create(payload)));
app.post('/api/teams/', (req, res) => handleCreateRequest(req, res, (payload) => Team.create(payload)));

app.get('/api/activities', (_req, res) => handleCollectionRequest(res, () => Activity.find().populate('userId').lean()));
app.get('/api/activities/', (_req, res) => handleCollectionRequest(res, () => Activity.find().populate('userId').lean()));
app.post('/api/activities', (req, res) => handleCreateRequest(req, res, (payload) => Activity.create(payload)));
app.post('/api/activities/', (req, res) => handleCreateRequest(req, res, (payload) => Activity.create(payload)));

app.get('/api/leaderboard', (_req, res) => handleCollectionRequest(res, () => LeaderboardEntry.find().populate('userId').lean()));
app.get('/api/leaderboard/', (_req, res) => handleCollectionRequest(res, () => LeaderboardEntry.find().populate('userId').lean()));
app.post('/api/leaderboard', (req, res) => handleCreateRequest(req, res, (payload) => LeaderboardEntry.create(payload)));
app.post('/api/leaderboard/', (req, res) => handleCreateRequest(req, res, (payload) => LeaderboardEntry.create(payload)));

app.get('/api/workouts', (_req, res) => handleCollectionRequest(res, () => Workout.find().lean()));
app.get('/api/workouts/', (_req, res) => handleCollectionRequest(res, () => Workout.find().lean()));
app.post('/api/workouts', (req, res) => handleCreateRequest(req, res, (payload) => Workout.create(payload)));
app.post('/api/workouts/', (req, res) => handleCreateRequest(req, res, (payload) => Workout.create(payload)));

const startServer = async () => {
  await connectToDatabase();
  await seedDatabase();

  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit Tracker backend listening on port ${port}`);
    console.log(`API URL: ${apiBaseUrl}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start backend:', error);
  process.exit(1);
});
