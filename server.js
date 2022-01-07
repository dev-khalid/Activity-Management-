import express from 'express';
import {} from 'dotenv/config';
import mongoose from 'mongoose';
import mongodb from 'mongodb';
import studyRoute from './routes/studyRoute.js';

//DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected To Database !'));

const app = express();

//mounting studyRoute with application
app.use(express.json());
app.get('/', (req, res, next) => {
  res.send('Hello from backend');
});
app.use('/study', studyRoute);

app.listen(5000, () => {
  console.log(`App running on port 5000`);
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
 *
 *
 *
 */
