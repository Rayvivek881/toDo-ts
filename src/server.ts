import express from 'express';
import mongoose from 'mongoose';
import UserRouter from '../routers/UserRouter';
import TodoRouter from '../routers/TodoRouter';
import Cors from 'cors';
import Morgan from 'morgan';
const app = express(), port = 3000;


mongoose.connect('mongodb://localhost:27017/ts-express', { keepAlive : true})
    .then(() =>  console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

app.use(Cors());
app.use(express.json());
app.use(Morgan('dev'));

app.use('/api/user', UserRouter);
app.use('/api/todo', TodoRouter);

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
