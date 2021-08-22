const express = require('express');
const router = express.Router();

const tokenService = require('../../services/token');
const userService = require('../../services/user');

const utils = require('../../utils');

router.post('/signin', async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const user = await userService.find({ login });

    if (!user || password !== user.password) {
      return res.sendStatus(403);
    }

    const tokensPair = await tokenService.createTokensPair(user.id);
    res.json(tokensPair);
  } catch (error) {
    return next(error);
  }
});

router.post('/signin/new_token', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const tokenFromDb = await tokenService.find({ token: refreshToken });

    if (!tokenFromDb) {
      return res.sendStatus(404);
    }

    const signature = tokenService.verifyRefreshToken(tokenFromDb.refreshToken);

    if (!signature) {
      await tokenService.remove({ userId: tokenFromDb.id });
      return res.sendStatus(403);
    }

    await tokenService.remove({ userId: tokenFromDb.id });
    const newNewTokensPair = await tokenService.createTokensPair(
      tokenFromDb.id
    );
    res.json(newNewTokensPair);
  } catch (error) {
    return next(error);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const { login, password } = req.body;

    if (!utils.validateEmail(login) && !utils.validatePhone(login)) {
      return res.status(406).json({
        message: 'Invalid username',
      });
    }

    const isUserExist = await userService.find({ login });

    if (isUserExist) {
      return res.json({
        message: 'User already exist',
      });
    }

    await userService.addUser({ login, password });
    const tokensPair = await tokenService.createTokensPair(login);
    res.json(tokensPair);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
