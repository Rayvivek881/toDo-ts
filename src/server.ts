import express from 'express';
import mongoose from 'mongoose';
import Dotenv from 'dotenv';
import UserRouter from '../routers/UserRouter';
import TodoRouter from '../routers/TodoRouter';
import Cors from 'cors';
import Morgan from 'morgan';
const app = express(), { MongoUrl, Port } = process.env;
Dotenv.config();


mongoose.connect(`${MongoUrl}`, { keepAlive : true})
    .then(() =>  console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

app.use(Cors());
app.use(express.json());
app.use(Morgan('dev'));

app.use('/api/user', UserRouter);
app.use('/api/todo', TodoRouter);

app.listen(Port, () => {
    console.log(`server started at http://localhost:${Port}`);
});
