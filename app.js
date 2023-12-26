import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user_routes.js';
import eventRouter from './routes/event_routes.js';
import cors from 'cors';

const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());    



//Middlewares

app.use('/user',userRouter);
app.use('/event',eventRouter);



mongoose.connect(`mongodb+srv://admin:HSlTEX5qN7VtSc2c@cluster0.ubmdccy.mongodb.net/?retryWrites=true&w=majority`,

).then(()=>{
    app.listen(PORT,()=>{
        console.log('server is running on port 5000');
    });
}).catch(err=>{
    console.log(err);
}
    )





//HSlTEX5qN7VtSc2c
