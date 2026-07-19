const mongoose = require('mongoose');

// If no MONGO_URI is provided, use an in-memory MongoDB for safe local/demo runs.
let MongoMemoryServer;
let mongoServer;

const connectDB = async () => {
  try {
    if (process.env.MONGO_URI && process.env.MONGO_URI.trim() !== '') {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('✅ MongoDB Atlas Connected Successfully');
      return;
    }

    // Dynamically import mongodb-memory-server when needed to avoid requiring it in production.
    try {
      MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
    } catch (err) {
      console.error('mongodb-memory-server is not installed. Set MONGO_URI to connect to a real database.');
      process.exit(1);
    }

    // Start in-memory MongoDB
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    console.log('✅ MongoDB In-Memory Server Started');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:');
    console.error(error);
    process.exit(1);
  }
};

const stopInMemoryDB = async () => {
  try {
    if (mongoServer) {
      await mongoose.disconnect();
      await mongoServer.stop();
      console.log('🛑 In-memory MongoDB stopped');
    }
  } catch (err) {
    // ignore
  }
};

module.exports = connectDB;
module.exports.stopInMemoryDB = stopInMemoryDB;