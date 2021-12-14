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

// 5 - Crie o endpoint PUT /talker/:id

talkerRouter.put('/:id', validToken, validName, validAge, hasTalk,
  hasRate, validRate, hasDate, validDate, async (req, res) => {
  const id = Number(req.params.id);
  req.body.id = id;
  const chosenTalker = req.body;
  let talkerList = await fs.readFile(talkerJson, 'utf-8');
  talkerList = JSON.parse(talkerList);
  const index = talkerList.indexOf(talkerList.find((talker) => talker.id === id));
  const newList = talkerList.slice(0, index)
    .concat(chosenTalker)
    .concat(talkerList.slice(index + 1));
  fs.writeFile(talkerJson, JSON.stringify(newList));
  return res.status(200).send(req.body);
});

// 6 - Crie o endpoint DELETE /talker/:id

talkerRouter.delete('/:id', validToken, async (req, res) => {
  const id = Number(req.params.id);
  req.body.id = id;
  let talkerList = await fs.readFile(talkerJson, 'utf-8');
  talkerList = JSON.parse(talkerList);
  const index = talkerList.indexOf(talkerList.find((talker) => talker.id === id));
  const newList = talkerList.slice(0, index)
    .concat(talkerList.slice(index + 1));
  fs.writeFile(talkerJson, JSON.stringify(newList));
  return res.status(200).send({
    message: 'Pessoa palestrante deletada com sucesso',
  });
});

module.exports = talkerRouter;
