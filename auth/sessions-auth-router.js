// SESSIONS

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Users = require('../models/users-model');

router.post('/register', (req, res) => {
  const user = req.body;
  const rounds = process.env.HASH_ROUNDS || 12;
  const hash = bcrypt.hashSync(user.password, rounds);

  user.password = hash;

  Users.addUser(user)
    .then((response) => {
      res.status(200).json({ message: user });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.loggedIn = true;
        res.status(200).json({ message: 'Welcome!' });
      } else {
        res.status(401).json({ message: 'Invalid Username and Password' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

router.get('/logout', (req, res) => {
  // check for session otherwise the app may crash
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        // end = no data to send
        res.status(204).end();
      }
    });
  } else {
    res.status(204).end();
  }
});

module.exports = router;
