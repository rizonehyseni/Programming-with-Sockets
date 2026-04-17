const config = require('./config');

const clients = new Map();
const messagesLog = [];
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
    console.log(`Admini u caktua: ${key}`);

    return true;
  }
  return false;
},
isAdmin(key) {
  return key === currentAdminKey;
},
removeAdminIfDisconnected(key) {
  if (key === currentAdminKey) {
    currentAdminKey = null;
    console.log(`Admini u largua automatikisht: ${key}`);
  }
},
updateActivity(key) {
  if (clients.has(key)) clients.get(key).lastActive = Date.now();
},
incrementMessage(key, msg) {
  if (clients.has(key)) {
    const c = clients.get(key);
    c.messageCount++;

    messagesLog.push({
      clientKey: key,
      message: msg,
      time: new Date().toISOString()
    });
    if (messagesLog.length > 50) messagesLog.shift();
  }
},

getResponseDelay(key) {
  return this.isAdmin(key) ? 50 : 300;
},
checkTimeouts() {
  const now = Date.now();

  for (const [key, data] of clients.entries()) {
    if (now - data.lastActive > config.CLIENT_TIMEOUT) {
      console.log(`Klienti u mbyll per timeout: ${key}`);

      this.removeAdminIfDisconnected(key);
      clients.delete(key);
    }
  }
},

getActiveClients() {
  return Array.from(clients.entries()).map(([key, data]) => ({
    clientKey: key,
    role: data.role,
    isAdmin: key === currentAdminKey,
    messageCount: data.messageCount
  }));
},











