const express = require('express');
const server = express();
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const dbConnection = require('../data/db-config');

// Import Routes
const usersRoute = require('../routes/users-route');
const authRoute = require('../auth/auth-router');

// Middleware
const authenticator = require('../auth/authenticator');

// Session
const sessionConfig = {
  name: 'whatever',
  secret: process.env.SESSION_SECRET || '123456',
  resave: false,
  saveUninitialized: process.env.SEND_COOKIES || true,
  cookie: {
    maxAge: 1000 * 60 * 2,
    secure: process.env.USE_SECURE_COOKIES || false,
    httpOnly: true,
  },
  // the store property controls where the session is stored, by default it is in memory
  // we're changing it to use the database
  store: new KnexSessionStore({
    knex: dbConnection,
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    // will remove expired sessions every hour
    clearInterval: 1000 * 60 * 60,
  }),
};

// Use
server.use(express.json());
server.use(session(sessionConfig));

// Use Routes
server.use('/api/users', authenticator, usersRoute);
server.use('/api/', authRoute);

// Test
server.get('/', (req, res) => {
  res.send(`<h1>SERVER IS WORKING</h1>`);
});

module.exports = server;
