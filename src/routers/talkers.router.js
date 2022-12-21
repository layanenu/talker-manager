const express = require('express');
const { readFileTalkers } = require('../utils/fsUtils');

const router = express.Router();

router.get('/talker', async (req, res) => {
  const talkersFile = await readFileTalkers();
  try {
    res.status(200).json(talkersFile);
  } catch (error) {
    res.status(200).end([]);
  }
});

module.exports = router;

// route.get('/talker', async (req, res) => {
//   const result = await readfile();
//   try {
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(400).end([]);
//   }