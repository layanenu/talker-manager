const express = require('express');
const { readFileTalkers, writeFileTalkers } = require('../utils/fsUtils');
const { validateTalk, validatewatchedAt, validateRate } = require('../middlewares/validateTalk');
const validateAge = require('../middlewares/validateAge');
const validateAutorization = require('../middlewares/validateAutorization');
const validateName = require('../middlewares/validateName');

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

router.post('/talker', validateAutorization, validateName, validateAge, 
validateTalk, validatewatchedAt, 
validateRate, async (req, res) => {
  const talkersFile = await readFileTalkers();
  const talkerId = talkersFile.length + 1;
  const talker = { id: talkerId, ...req.body };
  await writeFileTalkers(talker);
  return res.status(201).json(talker);
});

module.exports = router; 