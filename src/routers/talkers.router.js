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

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkersFile = await readFileTalkers();
  const talkerId = talkersFile.find((talker) => talker.id === Number(id));

  if (!talkerId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
    return res.status(200).json(talkerId);
});

module.exports = router;