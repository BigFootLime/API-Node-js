import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connecté à MongoDB avec succès !');
  } catch (err) {
    console.error('Erreur de connexion MongoDB', err);
    process.exit(1);
  }
};