// This file is used to setup the test environment before running the tests
// It connects to the MongoDB database, clears the database after each test, and closes the connection after all tests are done
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.test' }) 

// Setup the MongoDB connection
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI as string)
})
// Close the MongoDB connection
afterAll(async () => {
  await mongoose.disconnect()
})
// Clear the database after each test
afterEach(async () => {
  const collections = await mongoose.connection.db?.collections() || []
  for (const collection of collections) {
    await collection.deleteMany({})
  }
})
