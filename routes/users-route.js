const express = require('express');
const router = express.Router();

const Users = require('../models/users-model');

router.get('/', (req, res) => {
  console.log('token', req.decodedToken);
  Users.findAll()
    .then((users) => {
      res.status(200).json({ message: users });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
