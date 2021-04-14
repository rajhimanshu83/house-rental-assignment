import mongoose from 'mongoose';
 
import User from './user';
import Owner from './owner';
 
const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};
 
const models = { User, Owner };
 
export { connectDb };
 
export default models;