const express = require('express');
const { readFileTalkers, writeFileTalkers, writeFileTalkersArray } = require('../utils/fsUtils');
const { validateTalk, validatewatchedAt, validateRate } = require('../middlewares/validateTalk');
const validateAge = require('../middlewares/validateAge');
const validateAutorization = require('../middlewares/validateAutorization');
const validateName = require('../middlewares/validateName');

const router = express.Router();

router.get('/talker/search', validateAutorization, async (req, res) => {
  try {
    const { q } = req.query;
    const talkersFile = await readFileTalkers();
    const filteredTalker = talkersFile.filter((e) => e.name.includes(q));
    if (q) {
      return res.status(200).json(filteredTalker);
    }
    if (!q) {
      return res.status(200).json(talkersFile);
    }
    if (!filteredTalker) {
    return res.status(200).json([]);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

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

router.put('/talker/:id', validateAutorization, validateName, validateAge, 
validateTalk, validatewatchedAt, validateRate, async (req, res) => {
  const { id } = req.params;
  const talkersFile = await readFileTalkers();
  const talkerId = talkersFile.find((talker) => talker.id === Number(id));
  talkersFile.splice(talkerId, 1);
  const talker = { id: talkersFile.length + 1, ...req.body };
  await writeFileTalkersArray([...talkersFile, talker]);
  return res.status(200).json(talker);
});

router.delete('/talker/:id', validateAutorization, async (req, res) => {
  const { id } = req.params;
  const talkersFile = await readFileTalkers();
  const talkerId = talkersFile.find((talker) => talker.id === Number(id));
  const index = talkersFile.indexOf(talkerId);
  talkersFile.splice(index, 1);
  await writeFileTalkersArray(talkersFile);
  return res.status(204).end();
});

module.exports = router; 