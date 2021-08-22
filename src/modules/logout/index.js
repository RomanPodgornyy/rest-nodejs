const express = require('express');
const router = express.Router();

const tokenService = require('../../services/token');

router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    await tokenService.remove({ userId });
    res.json({
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
