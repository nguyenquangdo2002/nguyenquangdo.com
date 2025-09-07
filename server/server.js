import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRouter from "./routes/auth/auth-routes.js";
import passport from 'passport';
import "./controllers/auth/googleAuth.js";
import session from 'express-session';

import mbbankRouter from "./routes/auth/auth-routes.js";       // T?o file này n?u ch?a có
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => { console.error("MongoDB connection error:", err) });



app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
        'content-type',
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma',
    ]
}));

app.use(express.json());
app.use(cookieParser());
// google Auth 
app.use(session({
    secret: "SESSION_SECRET",
    resave: false,
    saveUninitiallized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: "lax"
    }
}));

app.use(passport.initialize());
app.use(passport.session())

app.use("/api/mbbank", mbbankRouter)
app.use("/api/auth", authRouter)


app.listen(PORT, () => {
    console.log("server is running on port " + PORT);
})