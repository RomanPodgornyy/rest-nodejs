const jwt = require('jsonwebtoken');

const config = require('../../config');

const dbService = require('../database');

async function createTokensPair(userId) {
  const refreshToken = jwt.sign({ id: userId }, config.REFRESH_SECRET_KEY, {
    expiresIn: config.REFRESH_EXPIRED_TIME,
  });
  const accessToken = jwt.sign({ id: userId }, config.ACCESS_SECRET_KEY, {
    expiresIn: config.ACCESS_EXPIRED_TIME,
  });

  const isAlreadyLogin = await find({ userId });

  if (isAlreadyLogin) {
    await update({ token: refreshToken, userId });
  } else {
    await add({ token: refreshToken, userId });
  }

  return {
    accessToken,
    refreshToken,
  };
}

function verifyRefreshToken(token) {
  return jwt.verify(token, config.REFRESH_SECRET_KEY, (error) => {
    if (error) {
      return false;
    }

    return true;
  });
}

function find({ userId, token }) {
  const query = token
    ? `SELECT * FROM refreshTokens WHERE refreshToken = '${token}' LIMIT 1`
    : `SELECT * FROM refreshTokens WHERE id = '${userId}' LIMIT 1`;

  return new Promise((resolve, reject) => {
    dbService.query(query, (error, result) => {
      if (error) {
        reject(error);
      }

      resolve(result[0]);
    });
  });
}

function add({ token, userId }) {
  const query = `INSERT INTO refreshTokens (id, refreshToken) VALUES ('${userId}', '${token}')`;
  return new Promise((resolve, reject) => {
    dbService.query(query, (error, result) => {
      if (error) {
        reject(error);
      }

      resolve(result[0]);
    });
  });
}

function update({ token, userId }) {
  const query = `UPDATE refreshTokens SET refreshToken = '${token}' WHERE id = '${userId}'`;
  return new Promise((resolve, reject) => {
    dbService.query(query, (error, result) => {
      if (error) {
        reject(error);
      }

      resolve(result[0]);
    });
  });
}

function remove({ userId }) {
  const query = `DELETE FROM refreshTokens WHERE id = '${userId}'`;
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
  createTokensPair,
  remove,
  find,
  verifyRefreshToken,
};
