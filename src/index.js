const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(bodyParser.json());

const pathTalker = path.resolve(__dirname, '..', 'src', 'talker.json');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar // vqv
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// Req 1
app.get('/talker', async (_req, res) => {
  const talker = JSON.parse(await fs.readFile(pathTalker, 'utf8')) || [];
  res.status(200).json(talker);
});

// Req 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = JSON.parse(await fs.readFile(pathTalker, 'utf8'));
  const filterTalker = talker.filter((elem) => elem.id === Number(id));
  if (filterTalker.length) {
    res.status(200).json(...filterTalker);
  } else {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});
