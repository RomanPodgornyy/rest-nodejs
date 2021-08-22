const jwt = require('jsonwebtoken');
const multer = require('multer');

const config = require('../config');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];

  if (!accessToken) {
    return res.sendStatus(401);
  }

  jwt.verify(accessToken, config.ACCESS_SECRET_KEY, (error, user) => {
    if (error) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./temp");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }, 
})

const upload = multer({ storage: fileStorage })

module.exports = {
  authenticateToken,
  upload,
};
