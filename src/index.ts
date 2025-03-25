// Desc: Entry point for the server
// Importing the app from the config folder and starting the server
// Also connecting to the database

import dotenv from 'dotenv';
import {app} from './config/app';
import { connectDB } from './config/db'

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  })
}).catch((err) => {
  console.error('❌ Error starting server:', err)
})
