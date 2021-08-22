const dbService = require('../database');

function find({ login }) {
  const query = `SELECT * FROM users WHERE id = '${login}' LIMIT 1`;
  return new Promise((resolve, reject) => {
    dbService.query(query, (error, result) => {
      if (error) {
        reject(error);
      }

      resolve(result[0]);
    });
  });
}

function addUser({ login, password }) {
  const query = `INSERT INTO users (id, password) VALUES ('${login}', '${password}')`;
  return new Promise((resolve, reject) => {
    dbService.query(query, (error, result) => {
      if (error) {
        reject(error);
      }

      resolve(result[0]);
    });
  });
}

module.exports = {
  find,
  addUser,
};
