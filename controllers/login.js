const express = require('express');
const crypto = require('crypto');

const loginRouter = express.Router();

const regEmail = /\S+@\S+\.\S+/;
const regPassword = /\w{6,}$/;

loginRouter.post('/', (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  const { email, password } = req.body;
  const validateEmail = regEmail.test(email);
  const validatePassword = regPassword.test(password);
  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!validateEmail) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (!validatePassword) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).send({ token });
});

module.exports = loginRouter;
