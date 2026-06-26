"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.apiBaseUrl = exports.port = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("./models");
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
exports.apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${exports.port}`;
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
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
exports.app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        message: 'OctoFit Tracker API is running',
        apiBaseUrl: exports.apiBaseUrl
    });
});
exports.app.get('/api/users', (_req, res) => handleCollectionRequest(res, () => models_1.User.find().lean()));
exports.app.get('/api/users/', (_req, res) => handleCollectionRequest(res, () => models_1.User.find().lean()));
exports.app.post('/api/users', (req, res) => handleCreateRequest(req, res, (payload) => models_1.User.create(payload)));
exports.app.post('/api/users/', (req, res) => handleCreateRequest(req, res, (payload) => models_1.User.create(payload)));
exports.app.get('/api/teams', (_req, res) => handleCollectionRequest(res, () => models_1.Team.find().populate('members').populate('captainId').lean()));
exports.app.get('/api/teams/', (_req, res) => handleCollectionRequest(res, () => models_1.Team.find().populate('members').populate('captainId').lean()));
exports.app.post('/api/teams', (req, res) => handleCreateRequest(req, res, (payload) => models_1.Team.create(payload)));
exports.app.post('/api/teams/', (req, res) => handleCreateRequest(req, res, (payload) => models_1.Team.create(payload)));
exports.app.get('/api/activities', (_req, res) => handleCollectionRequest(res, () => models_1.Activity.find().populate('userId').lean()));
exports.app.get('/api/activities/', (_req, res) => handleCollectionRequest(res, () => models_1.Activity.find().populate('userId').lean()));
exports.app.post('/api/activities', (req, res) => handleCreateRequest(req, res, (payload) => models_1.Activity.create(payload)));
exports.app.post('/api/activities/', (req, res) => handleCreateRequest(req, res, (payload) => models_1.Activity.create(payload)));
exports.app.get('/api/leaderboard', (_req, res) => handleCollectionRequest(res, () => models_1.LeaderboardEntry.find().populate('userId').lean()));
exports.app.get('/api/leaderboard/', (_req, res) => handleCollectionRequest(res, () => models_1.LeaderboardEntry.find().populate('userId').lean()));
exports.app.post('/api/leaderboard', (req, res) => handleCreateRequest(req, res, (payload) => models_1.LeaderboardEntry.create(payload)));
exports.app.post('/api/leaderboard/', (req, res) => handleCreateRequest(req, res, (payload) => models_1.LeaderboardEntry.create(payload)));
exports.app.get('/api/workouts', (_req, res) => handleCollectionRequest(res, () => models_1.Workout.find().lean()));
exports.app.get('/api/workouts/', (_req, res) => handleCollectionRequest(res, () => models_1.Workout.find().lean()));
exports.app.post('/api/workouts', (req, res) => handleCreateRequest(req, res, (payload) => models_1.Workout.create(payload)));
exports.app.post('/api/workouts/', (req, res) => handleCreateRequest(req, res, (payload) => models_1.Workout.create(payload)));
const startServer = async () => {
    await (0, models_1.connectToDatabase)();
    await (0, models_1.seedDatabase)();
    return exports.app.listen(exports.port, '0.0.0.0', () => {
        console.log(`OctoFit Tracker backend listening on port ${exports.port}`);
        console.log(`API URL: ${exports.apiBaseUrl}`);
    });
};
exports.startServer = startServer;
