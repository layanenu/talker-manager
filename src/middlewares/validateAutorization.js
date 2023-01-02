const validateAutorization = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length < 16 || typeof authorization !== 'string') {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = validateAutorization;

// A requisição deve ter o token de autenticação nos headers, no campo authorization.
// Caso o token não seja encontrado retorne um código de status 401, com o seguinte corpo:
// {
//   "message": "Token não encontrado"
// }
// Caso o token seja inválido retorne um código de status 401, com o seguinte corpo:
// Dica 💡: Um token válido é composto por exatamente 16 caracteres e deve ser do tipo string.
// {
//   "message": "Token inválido"
// }