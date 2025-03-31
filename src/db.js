import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://chowanza:chowanza@cluster0.wzqpv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}
