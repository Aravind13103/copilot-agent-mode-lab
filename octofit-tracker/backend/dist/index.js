"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("./models");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const handleCollectionRequest = async (res, loader) => {
    try {
        const items = await loader();
        res.json(items);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to load collection', details: error });
    }
};
const handleCreateRequest = async (req, res, createFn) => {
    try {
        const item = await createFn(req.body);
        res.status(201).json(item);
    }
    catch (error) {
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
app.get('/api/users', (_req, res) => handleCollectionRequest(res, () => models_1.User.find().lean()));
app.get('/api/users/', (_req, res) => handleCollectionRequest(res, () => models_1.User.find().lean()));
app.post('/api/users', (req, res) => handleCreateRequest(req, res, (payload) => models_1.User.create(payload)));
app.post('/api/users/', (req, res) => handleCreateRequest(req, res, (payload) => models_1.User.create(payload)));
app.get('/api/teams', (_req, res) => handleCollectionRequest(res, () => models_1.Team.find().populate('members').populate('captainId').lean()));
app.get('/api/teams/', (_req, res) => handleCollectionRequest(res, () => models_1.Team.find().populate('members').populate('captainId').lean()));
app.post('/api/teams', (req, res) => handleCreateRequest(req, res, (payload) => models_1.Team.create(payload)));
app.post('/api/teams/', (req, res) => handleCreateRequest(req, res, (payload) => models_1.Team.create(payload)));
app.get('/api/activities', (_req, res) => handleCollectionRequest(res, () => models_1.Activity.find().populate('userId').lean()));
app.get('/api/activities/', (_req, res) => handleCollectionRequest(res, () => models_1.Activity.find().populate('userId').lean()));
app.post('/api/activities', (req, res) => handleCreateRequest(req, res, (payload) => models_1.Activity.create(payload)));
app.post('/api/activities/', (req, res) => handleCreateRequest(req, res, (payload) => models_1.Activity.create(payload)));
app.get('/api/leaderboard', (_req, res) => handleCollectionRequest(res, () => models_1.LeaderboardEntry.find().populate('userId').lean()));
app.get('/api/leaderboard/', (_req, res) => handleCollectionRequest(res, () => models_1.LeaderboardEntry.find().populate('userId').lean()));
app.post('/api/leaderboard', (req, res) => handleCreateRequest(req, res, (payload) => models_1.LeaderboardEntry.create(payload)));
app.post('/api/leaderboard/', (req, res) => handleCreateRequest(req, res, (payload) => models_1.LeaderboardEntry.create(payload)));
app.get('/api/workouts', (_req, res) => handleCollectionRequest(res, () => models_1.Workout.find().lean()));
app.get('/api/workouts/', (_req, res) => handleCollectionRequest(res, () => models_1.Workout.find().lean()));
app.post('/api/workouts', (req, res) => handleCreateRequest(req, res, (payload) => models_1.Workout.create(payload)));
app.post('/api/workouts/', (req, res) => handleCreateRequest(req, res, (payload) => models_1.Workout.create(payload)));
const startServer = async () => {
    await (0, models_1.connectToDatabase)();
    await (0, models_1.seedDatabase)();
    app.listen(port, '0.0.0.0', () => {
        console.log(`OctoFit Tracker backend listening on port ${port}`);
        console.log(`API URL: ${apiBaseUrl}`);
    });
};
startServer().catch((error) => {
    console.error('Failed to start backend:', error);
    process.exit(1);
});
