const db = require('../data/db-config');

module.exports = {
  findAll,
  addUser,
  findBy,
};

function findAll() {
  return db('users');
}

function addUser(user) {
  return db('users').insert(user);
}

function findBy(filter) {
  return db('users').where(filter);
}
