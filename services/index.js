const validToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).send({ message: 'Token inválido' });
  next();
};

const validName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  if (age < 18) {
    return res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
  } 
  next();
};

const hasTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res
      .status(400)
      .send({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  next();
};

const hasRate = (req, res, next) => {
  const { talk } = req.body;
  if (talk && !talk.rate) {
    return res
      .status(400)
      .send({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  next();
};

const hasDate = (req, res, next) => {
  const { talk } = req.body;
  if (talk && !talk.watchedAt) {
    return res
      .status(400)
      .send({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  next();
};

const validRate = (req, res, next) => {
  const { talk } = req.body;
  if (talk && (talk.rate < 1 || talk.rate > 5 || talk.rate !== parseInt(talk.rate, 10))) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const validDate = (req, res, next) => {
  const regDate = /[0-3][0-9]\/[0-1][0-9]\/[0-9][0-9][0-9][0-9]/;
  const { talk } = req.body;
  if (talk && talk.watchedAt && !regDate.test(talk.watchedAt)) {
    return res.status(400).send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = {
  validToken,
  validName,
  validAge,
  hasTalk,
  hasRate,
  hasDate,
  validRate,
  validDate,
};
