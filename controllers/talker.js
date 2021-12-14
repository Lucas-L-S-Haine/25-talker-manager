const express = require('express');
const fs = require('fs/promises');

const talkerRouter = express.Router();

const talkerJson = './talker.json';
const {
  validToken,
  validName,
  validAge,
  hasTalk,
  hasRate,
  hasDate,
  validRate,
  validDate,
} = require('../middlewares');

talkerRouter.get('/', async (req, res) => {
  const talkerList = await fs.readFile(talkerJson, 'utf-8');
  if (!talkerList) return res.status(200).send([]);
  return res.status(200).send(JSON.parse(talkerList));
});

talkerRouter.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const talkerList = await fs.readFile(talkerJson, 'utf-8');
  const chosenTalker = JSON
    .parse(talkerList)
    .find((talker) => (talker.id === id));
  if (!chosenTalker) {
    return res.status(404).send({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  return res.status(200).send(chosenTalker);
});

talkerRouter.post('/', validToken, validName, validAge, hasTalk,
  hasRate, hasDate, validRate, validDate, async (req, res) => {
  const chosenTalker = req.body;
  const talkerList = await fs.readFile(talkerJson, 'utf-8');
  req.body.id = JSON.parse(talkerList).length + 1;
  const newList = JSON.stringify(JSON.parse(talkerList).concat(chosenTalker));
  fs.writeFile(talkerJson, newList);
  return res.status(201).send(req.body);
});

module.exports = talkerRouter;
