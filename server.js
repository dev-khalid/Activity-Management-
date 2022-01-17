import express from 'express';
import {} from 'dotenv/config';
import mongoose from 'mongoose';
import mongodb from 'mongodb';
import studyRoute from './routes/studyRoute.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import targetRoute from './routes/targetRoute.js';
import achievementRoute from './routes/achievementRoute.js';
import studentRoute from './routes/studentRoute.js';

const __dirname = path.resolve();

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

app.get('/api', (req, res, next) => {
  console.log('At least getting the request here.');
  res.send('Hello from backend');
});

app.use('/api/study', studyRoute);
app.use('/api/target', targetRoute);
app.use('/api/achievement', achievementRoute);
app.use('/api/student', studentRoute);
if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/build', 'index.html'));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
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
