// This file is used to configure the database connection
// It imports the mongoose module
// It exports a function that connects to the database

import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connecté à MongoDB avec succès !');
  } catch (err) {
    console.error('Erreur de connexion MongoDB', err);
    process.exit(1);
  }
};