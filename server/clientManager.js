const config = require('./config');

const clients = new Map();
let currentAdminKey = null;

module.exports = {};

module.exports = {
  addOrUpdateClient(rinfo) {
    const key = `${rinfo.address}:${rinfo.port}`;
    if (clients.size >= config.MAX_CLIENTS && !clients.has(key)) {
  return false;
}
    if (!clients.has(key)) {
      clients.set(key, {
  role: config.NORMAL_ROLE,
  lastActive: Date.now(),
  messageCount: 0
});
}else {
  clients.get(key).lastActive = Date.now();
}
    return true;
  },

trySetAdmin(key) {
  if (currentAdminKey && currentAdminKey !== key) {
  return false;
}
  if (clients.has(key)) {
    clients.get(key).role = config.ADMIN_ROLE;
    currentAdminKey = key;
    return true;
  }
  return false;
}




