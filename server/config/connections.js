const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();


const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, 
  useFindAndModify: false, 
});


const db = mongoose.connection;


db.on('connected', () => {
  console.log(`Connected to MongoDB at ${mongoURI}`);
});

db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});


process.on('SIGINT', () => {
  db.close(() => {
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  });
});
