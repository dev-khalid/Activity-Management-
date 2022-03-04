import express from 'express';
import {} from 'dotenv/config';
import mongoose from 'mongoose';
import moment from 'moment';
import webpush from 'web-push';
import studyRoute from './routes/studyRoute.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import targetRoute from './routes/targetRoute.js';
import achievementRoute from './routes/achievementRoute.js';
import studentRoute from './routes/studentRoute.js';
import notificationRoute from './routes/notificationRoute.js';
import exerciseRoute from './routes/exerciseRoute.js';

// import Study from './models/studyModel.js';
// import backupData from './backupData.js';

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

//backup done
// app.get('/preparing', async (req, res) => {
//   const newData = backupData.map((d) => {
//     d.date = d.createdAt;
//     delete d.__v;
//     delete d._id;
//     delete d.createdAt;
//     delete d.updatedAt;
//     return d;
//   });
//   const data = await Study.insertMany(newData);

//   res.json(data);
// });

app.get('/api', (req, res, next) => {
  console.log('At least getting the request here.');
  res.send('Hello from backend');
});

app.use('/api/study', studyRoute);
app.use('/api/target', targetRoute);
app.use('/api/achievement', achievementRoute);
app.use('/api/student', studentRoute);
app.use('/api/notification', notificationRoute);
app.use('/api/exercise', exerciseRoute);

//pushnig notification

// Public Key:
// BKSDIGUvwBlG2YZupbSf6lrkQL0RKFoETXmi-BRKyvHe23Q2l2i8nC1MetSkK5HwU8ahaifP0Kn9OKqjQ9_XvCg

// Private Key:
// gWOsk0I9a4hLmY9MR-5ww8kjtYNfvdaAEaxQ7OaP8Xw

const publicVapidKey =
  'BKSDIGUvwBlG2YZupbSf6lrkQL0RKFoETXmi-BRKyvHe23Q2l2i8nC1MetSkK5HwU8ahaifP0Kn9OKqjQ9_XvCg';
const privateVapidKey = 'gWOsk0I9a4hLmY9MR-5ww8kjtYNfvdaAEaxQ7OaP8Xw';
webpush.setVapidDetails(
  'mailto:khalidhossain727@gmail.com',
  publicVapidKey,
  privateVapidKey
);
app.use('/api/subscribe', (req, res) => {
  const notificationObj = req.body;
  const { subscription } = notificationObj;
  const payload = JSON.stringify(notificationObj.payload);
  res.status(201);
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

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
 
