const express = require('express')
const PORT = process.env.PORT || 5000
const cors = require('cors');

const app = express();

require('dotenv').config();

app.use(cors());

app.use(express.json({ limit: '2mb' }));

const router = require('./routes/index');

app.use(router);

app.listen(PORT, () => {
  console.log(`Port is listening on ${PORT}`); // eslint-disable-line
});

module.exports = app;
