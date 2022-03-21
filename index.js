const express = require('express');
const bodyParser = require('body-parser');
const talkerController = require('./controllers/talker');
const loginController = require('./controllers/login');

const app = express();
app.use(bodyParser.json());

const PORT = '8000';

app.use('/talker', talkerController);
app.use('/login', loginController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(200).send();
});

app.listen(PORT, async () => {
  console.log(`Application online on port \x1b[03;94m${PORT}\x1b[00m!`);
});
