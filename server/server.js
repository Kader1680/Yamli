import 'dotenv/config';
import http from 'http';
import express from 'express';
// import { Server } from 'socket.io';
import cors from 'cors';
import authRoutes from './router/auth.router.js';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();
const server = http.createServer(app);

app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/', authRoutes);

import profileRoutes from "./router/profile.router.js";

app.use("/api/profile", profileRoutes);

import postRoutes from "./router/post.router.js";

app.use("/api/post", postRoutes);
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

 
 