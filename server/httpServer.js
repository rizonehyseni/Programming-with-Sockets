const express = require('express');
const config = require('./config');
const app = express();

module.exports = {
  start() {
    app.listen(config.HTTP_PORT, () => {
      console.log(`Serveri HTTP per monitorim eshte aktiv ne: http://localhost:${config.HTTP_PORT}/stats`);
    });
  }
};