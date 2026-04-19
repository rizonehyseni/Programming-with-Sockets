const express = require('express');
const config = require('./config');
const clientManager = require('./clientManager');
const app = express();

module.exports = {
  start() {
    app.get('/stats', (req, res) => {
        const stats = {
            status: "ok",
            lidhjetAktive: clientManager.getClientCount(),
            klientet: clientManager.getActiveClients(),
            koha: new Date().toISOString()
        };
        res.json(stats);
    });
    app.listen(config.HTTP_PORT, () => {
      console.log(`Serveri HTTP per monitorim eshte aktiv ne: http://localhost:${config.HTTP_PORT}/stats`);
    });
  }
};