import express from 'express';
import {} from 'dotenv/config';
import mongoose from 'mongoose';
import mongodb from 'mongodb';
import studyRoute from './routes/studyRoute.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

//DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected To Database !'));

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res, next) => {
  console.log('At least getting the request here.');
  res.send('Hello from backend');
});
app.use('/api/study', studyRoute);

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
});

/**
 * 1 Hour on Backend.
 * 5 Hours on Frontend.
 *Study Hours Record Table:
 *    user
 *    current Date time will be automatically stored in mongo document So I don't need to store it .
 *    targetHour
 *    completed
 *
 *
 * Functions on it:
 *    create data,read data , update data .
 *no problem if I try to deploy the code for next 6 hours cause i will learn more about it . and its a part of code not waste of time .
 *
 *
 */
