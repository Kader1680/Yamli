# Yamli (Social Media Platform)

Yamli is a modern social media application designed to let users connect, share content, communicate, and build communities in one platform.
Users can create profiles, publish posts, upload media, like and comment on content, send and manage friend requests, and interact with other users. The platform also supports social relationships and community-based features such as groups and messaging.

## Tech Stack

**Client:** Vuejs, TailwindCSS
**Server:** Node, Express, Mysql

## Features
- User authentication and authorization
- User profiles
- Create, edit, and delete posts
- Image/video sharing
- Likes and comments
- Save/bookmark posts
- Friend requests and friendships
- Private messaging
- Groups and communities
- Notifications
- User feed
- Search and discovery

## Run Locally
Clone the project
```bash
git clone https://github.com/Kader1680/Yamli
```
Go to the project directory
```bash
cd Yamli
```
Access server directory
```bash
cd server
```
Install dependencies
```bash
npm install
```
Setup environment variables
```bash
cp .env.example .env
```
Then open `.env` and fill in your database credentials and other required values.

Run migrations
```bash
npx prisma migrate deploy
```
Generate the Prisma Client
```bash
npx prisma generate
```
Start the server
```bash
npx nodemon server.js
```
Access client directory
```bash
cd client
```
Install dependencies
```bash
npm install
```
Start client
```bash
npm run dev
```