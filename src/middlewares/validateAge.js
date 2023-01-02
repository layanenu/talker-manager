const validateAge = (req, res, next) => {
 const { age } = req.body;
 if (age === '' || !age) {
  return res.status(400).json({ message: 'O campo "age" é obrigatório' });
 }
 if (age < 18) {
  return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
 }
 next();
};

module.exports = validateAge;
// O campo age deverá ser um inteiro e apenas pessoas maiores de idade (pelo menos 18 anos) podem ser cadastradas. 
// Ele é obrigatório.
// Caso o campo não seja passado ou esteja vazio retorne um código de status 400, com o seguinte corpo:
// {
//   "message": "O campo \"age\" é obrigatório"
// }
// Caso a pessoa palestrante não tenha pelo menos 18 anos retorne status 400, com o seguinte corpo:
// {
//   "message": "A pessoa palestrante deve ser maior de idade"
// }