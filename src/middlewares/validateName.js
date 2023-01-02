const validateName = (req, res, next) => {
  const { name } = req.body;

  if (name === '' || !name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

module.exports = validateName;

// O campo name deverá ter no mínimo 3 caracteres. Ele é obrigatório.
// Caso o campo não seja passado ou esteja vazio retorne um código de status 400, com o seguinte corpo:
// {
//   "message": "O campo \"name\" é obrigatório"
// }
// Caso o nome não tenha pelo menos 3 caracteres retorne um código de status 400, com o seguinte corpo:
// {
//   "message": "O \"name\" deve ter pelo menos 3 caracteres"
// }
