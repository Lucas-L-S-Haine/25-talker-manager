const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const crypto = require('crypto-js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_OK_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talkerList = await fs.readFile('./talker.json', 'utf-8');
  if (!talkerList) return res.status(HTTP_OK_STATUS).send([]);
  return res.status(HTTP_OK_STATUS).send(JSON.parse(talkerList));
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerList = await fs.readFile('./talker.json', 'utf-8');
  const chosenTalker = JSON
    .parse(talkerList)
    .find((talker) => (talker.id === Number(id)));
  if (!chosenTalker) {
    return res.status(HTTP_NOT_OK_STATUS).send({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  return res.status(HTTP_OK_STATUS).send(chosenTalker);
});

app.post('/login', (req, res, next) => {
  const token = "7mqaVRXJSp886CGr";
});

app.listen(PORT, async () => {
  console.log(Object.keys(crypto));
  console.log('Online');
});
