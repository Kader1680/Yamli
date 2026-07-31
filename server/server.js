require('dotenv').config();

const http = require('http');
const express = require('express');
// const { Server } = require('socket.io');
const cors = require('cors');
const authRoutes = require('./router/authRouter');
// const messageRouter = require('./router/messageRouter');
// const profileRouter = require('./router/profileRouter');
// const postRouter = require('./router/postRouter');
// connectDB();
const path = require('path');

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true             
}));
 
app.use(express.json());

 
const { protect } = require('./controller/authController');



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

 