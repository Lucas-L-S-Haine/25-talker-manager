const regDate = /[0-3][0-9]\/[0-1][0-2]\/[0-9][0-9][0-9][0-9]/;

const validToken = (req) => {
  const { token } = req.headers;
  if (!token) return { status: 401, message: 'Token não encontrado' };
  if (token.length !== 16) return { status: 401, message: 'Token inválido' };
};

const validName = (req) => {
  const { name } = req.body;
  if (!name) return { status: 400, message: 'O campo "name" é obrigatório' };
  if (name.length < 3) return { status: 400, message: 'O "name" deve ter pelo menos 3 caracteres' };
};

const validAge = (req) => {
  const { age } = req.body;
  if (!age) return { status: 400, message: 'O campo "age" é obrigatório' };
  if (age < 18) return { status: 400, message: 'A pessoa palestrante deve ser maior de idade' };
};

const validDate = (req) => {
  const { watchedAt } = req.body.talk;
  if (!regDate.test(watchedAt)) {
    return { status: 400, message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  }
};

const validRate = (req) => {
  const { rate } = req.body.talk;
  if (rate < 1 || rate > 5 || rate !== parseInt(rate, 10)) {
    return { status: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  }
};

const validTalk = (req) => {
  const { talk } = req.body;
  const { watchedAt, rate } = talk;
  if (!talk || !rate || !watchedAt) {
    return {
      status: 400,
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
  }
};

const validate = (req, talker) => {
  validToken(req);
  validName(req);
  validAge(req);
  validDate(req);
  validRate(req);
  validTalk(req);
  return { status: 201, talker };
};

export default validate;
