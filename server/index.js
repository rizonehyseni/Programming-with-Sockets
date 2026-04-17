const fs = require('fs');
const config = require('./config');
const udpServer = require('./udpServer');
const httpServer = require('./httpServer');
const clientManager = require('./clientManager');

// Krijo folderin files nese nuk ekziston
if (!fs.existsSync(config.FILES_DIR)) {
  fs.mkdirSync(config.FILES_DIR);
  console.log('U krijua folderi files/');
}

udpServer.start();
httpServer.start();

// Kontrolli i timeout cdo 30 sekonda
setInterval(() => clientManager.checkTimeouts(), 30000);

console.log('=== Serveri UDP dhe HTTP u nis me sukses ===');