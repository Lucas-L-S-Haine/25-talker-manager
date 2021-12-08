const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const crypto = require('crypto');

  // const regEmail = /\w@\w.\w/;
const regEmail = /\S+@\S+\.\S+/;
const regPassword = /\w{6,}$/;

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(200).send();
});

app.get('/talker', async (req, res) => {
  const talkerList = await fs.readFile('./talker.json', 'utf-8');
  if (!talkerList) return res.status(200).send([]);
  return res.status(200).send(JSON.parse(talkerList));
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerList = await fs.readFile('./talker.json', 'utf-8');
  const chosenTalker = JSON
    .parse(talkerList)
    .find((talker) => (talker.id === Number(id)));
  if (!chosenTalker) {
    return res.status(404).send({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  return res.status(200).send(chosenTalker);
});

app.post('/login', (req, res) => {
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

app.listen(PORT, async () => {
  console.log('Online');
});
  // console.log(req.headers.token);
