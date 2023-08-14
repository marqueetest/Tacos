import express = require("express");

const app = express();
import mongoose from 'mongoose';
import indexRouter from './routes/index.routes';
import * as dotenv from 'dotenv';
import passport from "./middleware/passport";


// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 5558;


/*** DATABASE CONNECTION*/
(async function () {

  try {
    const url : string = process.env.MONGODB_URI || '';
    const connection = await mongoose.connect(url);
    mongoose.Promise = global.Promise;
    if(connection) console.log('Database Connected Successfully...');
  } catch (err) {
    console.log('Error while connecting database\n');
    console.log(err);
    process.exit(1);
  }
}());


app.use(express.json());

// Initialize Passport and add it as middleware
app.use(passport.initialize());

//Routes
app.use('/', indexRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});