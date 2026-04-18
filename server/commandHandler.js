const fileManager = require('./fileManager');
const clientManager = require('./clientManager');

module.exports = {
  handle(msg, clientKey) {
    const isAdmin = clientManager.isAdmin(clientKey);
    const response = { 
       type: 'response', 
       status: 'ok',
       isAdmin: isAdmin 
};
  

  }
};


