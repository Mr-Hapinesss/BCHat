import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRouter from './Router/auth.js';
import aiRouter from './Router/ai.js';

const PORT = process.env.PORT;

const app = express();
connectDB();

// Middleware
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
));
app.use(express.json({limit: '10mb'}));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

//routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/ai', aiRouter);

// home page
app.get('/', (req, res) => {
    res.send(' Server Homepage');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});