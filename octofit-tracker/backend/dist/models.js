"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = exports.connectToDatabase = exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const database_1 = require("./config/database");
Object.defineProperty(exports, "connectToDatabase", { enumerable: true, get: function () { return database_1.connectToDatabase; } });
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    age: { type: Number, required: true },
    location: { type: String, required: true, trim: true },
    fitnessGoal: { type: String, required: true, trim: true }
}, { timestamps: true });
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    sport: { type: String, required: true, trim: true },
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true }],
    captainId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });
const activitySchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    distanceKm: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    notes: { type: String, trim: true }
}, { timestamps: true });
const leaderboardEntrySchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    rank: { type: Number, required: true, unique: true },
    score: { type: Number, required: true },
    workoutStreak: { type: Number, required: true },
    badge: { type: String, required: true, trim: true }
}, { timestamps: true });
const workoutSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true, trim: true },
    equipment: [{ type: String, trim: true }],
    description: { type: String, required: true, trim: true }
}, { timestamps: true });
exports.User = mongoose_1.default.model('User', userSchema);
exports.Team = mongoose_1.default.model('Team', teamSchema);
exports.Activity = mongoose_1.default.model('Activity', activitySchema);
exports.LeaderboardEntry = mongoose_1.default.model('LeaderboardEntry', leaderboardEntrySchema);
exports.Workout = mongoose_1.default.model('Workout', workoutSchema);
const seedDatabase = async () => {
    const existingUsers = await exports.User.countDocuments();
    if (existingUsers > 0) {
        return;
    }
    const users = await exports.User.create([
        {
            name: 'Alex Chen',
            email: 'alex.chen@example.com',
            age: 31,
            location: 'Seattle',
            fitnessGoal: 'Marathon prep'
        },
        {
            name: 'Mina Patel',
            email: 'mina.patel@example.com',
            age: 28,
            location: 'Austin',
            fitnessGoal: 'Strength training'
        },
        {
            name: 'Daniel Brooks',
            email: 'daniel.brooks@example.com',
            age: 35,
            location: 'Denver',
            fitnessGoal: 'Weight loss'
        },
        {
            name: 'Priya Singh',
            email: 'priya.singh@example.com',
            age: 26,
            location: 'Chicago',
            fitnessGoal: 'Endurance cycling'
        }
    ]);
    const teams = await exports.Team.create([
        {
            name: 'Trailblazers',
            sport: 'Running',
            members: [users[0]._id, users[1]._id],
            captainId: users[0]._id
        },
        {
            name: 'Peak Performers',
            sport: 'CrossFit',
            members: [users[2]._id, users[3]._id],
            captainId: users[2]._id
        }
    ]);
    await exports.Activity.create([
        {
            userId: users[0]._id,
            type: 'Morning Run',
            durationMinutes: 32,
            caloriesBurned: 310,
            distanceKm: 5.4,
            date: new Date('2026-06-20T06:30:00.000Z'),
            notes: 'Steady pace with an easy cooldown.'
        },
        {
            userId: users[1]._id,
            type: 'Cycling',
            durationMinutes: 46,
            caloriesBurned: 380,
            distanceKm: 18.1,
            date: new Date('2026-06-21T18:15:00.000Z'),
            notes: 'Hill repeats completed successfully.'
        },
        {
            userId: users[2]._id,
            type: 'HIIT Circuit',
            durationMinutes: 28,
            caloriesBurned: 290,
            distanceKm: 3.2,
            date: new Date('2026-06-22T07:00:00.000Z'),
            notes: 'Focused on short bursts and full recovery.'
        }
    ]);
    await exports.LeaderboardEntry.create([
        {
            userId: users[0]._id,
            rank: 1,
            score: 1420,
            workoutStreak: 8,
            badge: 'Gold'
        },
        {
            userId: users[1]._id,
            rank: 2,
            score: 1375,
            workoutStreak: 6,
            badge: 'Silver'
        },
        {
            userId: users[3]._id,
            rank: 3,
            score: 1310,
            workoutStreak: 5,
            badge: 'Bronze'
        }
    ]);
    await exports.Workout.create([
        {
            name: 'HIIT Circuit',
            focus: 'Cardio',
            durationMinutes: 25,
            difficulty: 'Intermediate',
            equipment: ['Jump rope', 'Mat'],
            description: 'A fast-paced circuit of cardio intervals and core work.'
        },
        {
            name: 'Strength Builder',
            focus: 'Upper Body',
            durationMinutes: 40,
            difficulty: 'Intermediate',
            equipment: ['Dumbbells', 'Bench'],
            description: 'A balanced strength session with push-ups and rows.'
        },
        {
            name: 'Recovery Flow',
            focus: 'Mobility',
            durationMinutes: 20,
            difficulty: 'Easy',
            equipment: ['Yoga mat'],
            description: 'A gentle mobility session for post-workout recovery.'
        }
    ]);
    return { users, teams };
};
exports.seedDatabase = seedDatabase;
