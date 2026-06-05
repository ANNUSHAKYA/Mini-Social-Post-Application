const mongoose = require('mongoose');
const net = require('net');

let mongoServer;

const isMongoRunningLocal = () => {
  return new Promise((resolve) => {
    const client = new net.Socket();
    client.setTimeout(1500);
    client
      .once('connect', () => {
        client.destroy();
        resolve(true);
      })
      .once('error', () => {
        client.destroy();
        resolve(false);
      })
      .once('timeout', () => {
        client.destroy();
        resolve(false);
      })
      .connect(27017, '127.0.0.1');
  });
};

const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI;

    if (!uri) {
      console.log('Checking for local MongoDB on 127.0.0.1:27017...');
      const localRunning = await isMongoRunningLocal();
      
      if (localRunning) {
        console.log('Local MongoDB found. Connecting...');
        uri = 'mongodb://127.0.0.1:27017/mini-social-post';
      } else {
        console.log('Local MongoDB not running. Spawning in-memory MongoDB server for development...');
        const { MongoMemoryServer } = require('mongodb-memory-server');
        mongoServer = await MongoMemoryServer.create();
        uri = mongoServer.getUri();
      }
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
