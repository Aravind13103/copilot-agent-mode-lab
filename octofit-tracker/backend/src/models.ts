import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import { connectToDatabase } from './config/database';

export interface IUser extends Document {
  name: string;
  email: string;
  age: number;
  location: string;
  fitnessGoal: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITeam extends Document {
  name: string;
  sport: string;
  members: Types.ObjectId[];
  captainId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IActivity extends Document {
  userId: Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  distanceKm: number;
  date: Date;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILeaderboardEntry extends Document {
  userId: Types.ObjectId;
  rank: number;
  score: number;
  workoutStreak: number;
  badge: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWorkout extends Document {
  name: string;
  focus: string;
  durationMinutes: number;
  difficulty: string;
  equipment: string[];
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    age: { type: Number, required: true },
    location: { type: String, required: true, trim: true },
    fitnessGoal: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, trim: true },
    sport: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    captainId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    distanceKm: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    notes: { type: String, trim: true }
  },
  { timestamps: true }
);

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rank: { type: Number, required: true, unique: true },
    score: { type: Number, required: true },
    workoutStreak: { type: Number, required: true },
    badge: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

const workoutSchema = new Schema<IWorkout>(
  {
    name: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true, trim: true },
    equipment: [{ type: String, trim: true }],
    description: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export const Team: Model<ITeam> = mongoose.model<ITeam>('Team', teamSchema);
export const Activity: Model<IActivity> = mongoose.model<IActivity>('Activity', activitySchema);
export const LeaderboardEntry: Model<ILeaderboardEntry> = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);
export const Workout: Model<IWorkout> = mongoose.model<IWorkout>('Workout', workoutSchema);

export { connectToDatabase };

export const seedDatabase = async () => {
  const existingUsers = await User.countDocuments();
  if (existingUsers > 0) {
    return;
  }

  const users = await User.create([
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

  const teams = await Team.create([
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

  await Activity.create([
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

  await LeaderboardEntry.create([
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

  await Workout.create([
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
