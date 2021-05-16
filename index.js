const express = require('express');
const app = express();
var cors = require('cors')
const allRoutes = require('./routes/all');
const mongoose = require('mongoose');
const { DBUri, PORT } = require('./config');

mongoose.connect(DBUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(error => {
    console.error('Error happened while connecting to MongoDB...', error);
  });

app.use(express.json());
app.use(cors())
app.use('/', allRoutes);

const port = PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));