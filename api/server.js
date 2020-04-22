const express = require('express');
const server = express();

// Import Routes
const usersRoute = require('../routes/users-route');
const authRoute = require('../auth/auth-router');

// Middleware
const authenticator = require('../auth/authenticator');

// Use
server.use(express.json());

// Use Routes
server.use('/api/users', authenticator, usersRoute);
server.use('/api/', authRoute);

// Test
server.get('/', (req, res) => {
  res.send(`<h1>SERVER IS WORKING</h1>`);
});

module.exports = server;
