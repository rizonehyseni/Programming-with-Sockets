const dgram = require('dgram');
const config = require('./config');
const clientManager = require('./clientManager');
const commandHandler = require('./commandHandler');
const utils = require('./utils');

const server = dgram.createSocket('udp4');

module.exports = {
  start() {
    server.on('message', (msgBuffer, rinfo) => {
      const key = utils.generateClientKey(rinfo);

      try {
        const message = JSON.parse(msgBuffer.toString());

       
        clientManager.updateActivity(key);

      
        if (!clientManager.addOrUpdateClient(rinfo)) {
          utils.sendMessage(server, rinfo, { 
            type: 'response', 
            status: 'error', 
            message: 'Serveri eshte plot. Nuk mund te lidheni' 
          });
          return;
        }

       
        clientManager.incrementMessage(key, message);

        if (message.type === 'login') {
          if (message.password === config.ADMIN_PASSWORD) {
            const success = clientManager.trySetAdmin(key);
            if (success) {
              utils.sendMessage(server, rinfo, { 
                type: 'response', 
                status: 'ok', 
                message: 'Tani jeni admin. Keni qasje te plote ne server.' 
              });
            } else {
              utils.sendMessage(server, rinfo, { 
                type: 'response', 
                status: 'error', 
                message: 'Ka tashme nje admin aktiv. Nuk mund te beheni admin.' 
              });
            }
          } else {
            utils.sendMessage(server, rinfo, { 
              type: 'response', 
              status: 'error', 
              message: 'Fjalekalimi eshte i gabuar' 
            });
          }
          return;
        }

        // ====================== KOMANDAT ======================
        if (message.type === 'command') {
          const response = commandHandler.handle(message, key);
          
        
          const delay = clientManager.getResponseDelay(key);

          setTimeout(() => {
            utils.sendMessage(server, rinfo, response);
          }, delay);

          return;
        }

       
        utils.sendMessage(server, rinfo, { 
          type: 'response', 
          status: 'error', 
          message: 'Mesazh i pavlefshem. Perdorni komanda te vlefshme.' 
        });

      } catch (e) {
        console.error('Gabim ne procesimin e mesazhit:', e);
        utils.sendMessage(server, rinfo, { 
          type: 'response', 
          status: 'error', 
          message: 'Formati i mesazhit eshte i pavlefshem' 
        });
      }
    });


    server.on('listening', () => {
      console.log(`Serveri UDP eshte duke degjuar ne portin ${config.UDP_PORT}`);
    });


    server.bind(config.UDP_PORT);
  }
};