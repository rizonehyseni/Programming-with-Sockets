const config = require('./config');

const clients = new Map();

module.exports = {};

module.exports = {
  addOrUpdateClient(rinfo) {
    const key = `${rinfo.address}:${rinfo.port}`;

    if (!clients.has(key)) {
      clients.set(key, {
  role: config.NORMAL_ROLE,
  lastActive: Date.now(),
  messageCount: 0
});

    }

    return true;
  }
};





