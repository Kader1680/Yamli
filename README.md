# 🌐 Social Media Platform

A full-stack social media application built using **Node.js**, **Express**, **MYSQL**, and **Vue.js**. This app allows users to register, log in, create posts (text/images), like and comment, follow/unfollow users, and more.

---

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [License](#license)

---

## 🚀 Features

- ✅ User authentication (register/login/logout)
- 📝 Create, update, delete posts (text and images)
- ❤️ Like and comment on posts
- 🔔 Follow/unfollow users
- 👤 User profiles with follower/following counts
- 📰 News feed from followed users
- 📱 RESTful API (JSON)
- 🎨 Responsive UI using Vue.js

---
server/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── config/
│   │   ├── prisma.js
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── post.controller.js
│   │   ├── comment.controller.js
│   │   ├── follow.controller.js
│   │   └── message.controller.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── user.service.js
│   │   ├── post.service.js
│   │   └── ...
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── post.routes.js
│   │   ├── comment.routes.js
│   │   └── index.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── error.js
│   │   └── upload.js
│   │
│   ├── validators/
│   │   ├── auth.validator.js
│   │   ├── user.validator.js
│   │   └── post.validator.js
│   │
│   ├── utils/
│   │   ├── jwt.js
│   │   ├── password.js
│   │   ├── pagination.js
│   │   └── response.js
│   │
│   ├── sockets/
│   │   ├── chat.socket.js
│   │   └── index.js
│   │
│   ├── uploads/
│   │   ├── avatars/
│   │   ├── covers/
│   │   └── posts/
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── README.md