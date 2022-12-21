const express = require('express');
const { generateToken } = require('../utils/fsUtils');
const { validateLogin } = require('../middlewares/validateLogin');

const router = express.Router();

router.post('/login', validateLogin, (req, res) => {
  const token = generateToken();
  res.status(200).json({ token: `${token}` });
});

module.exports = router;