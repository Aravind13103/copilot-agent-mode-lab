import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(mongoUri);
  return mongoUri;
};

export default connectToDatabase;
