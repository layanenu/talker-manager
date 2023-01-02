const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

const validatewatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const dateRegex = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/;
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!dateRegex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const isRateFalseOrNumber = (req, res) => {
  const { talk: { rate } } = req.body;
  if (!rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (typeof rate !== 'number') {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
};

const isRateInteger = (req, res) => {
  const { talk: { rate } } = req.body;
  if (rate < 1 || rate > 5) {
    console.log(rate, 'rate');
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!Number.isInteger(rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
};

const validateRate = (req, res, next) => {
  const validationRateFalseOrNumber = isRateFalseOrNumber(req, res);
  if (validationRateFalseOrNumber) {
    return validationRateFalseOrNumber;
  }
  const validationRateInteger = isRateInteger(req, res);
  if (validationRateInteger) {
    return validationRateInteger;
  }
  next();
};

module.exports = {
  validateTalk,
  validatewatchedAt,
  validateRate,  
};