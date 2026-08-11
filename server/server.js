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

// app.use('/', messageRouter);


// app.use('/', postRouter);
 
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// app.use('/', profileRouter);




server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});


// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:5173", "http://localhost:5174"],
//     methods: ["GET", "POST"],
//     credentials: true,
//     allowedHeaders: ["my-custom-header"],
//   },
//   allowEIO3: true,
//   transports: ['websocket', 'polling']
// });

// app.set("io", io);

// io.use((socket, next) => {
//   const userId = socket.handshake?.auth?.userId;
//   if (!userId) {
//     console.warn(`Socket connected without userId: ${socket.id}`);
//     // allow connection to continue; user can emit 'join' later after login
//     return next();
//   }
//   socket.userId = userId;
//   next();
// });

// require("./socket")(io);
// module.exports = io;

 