const path = require('path');

module.exports = {
  UDP_PORT: 41234,
  HTTP_PORT: 8080,
  MAX_CLIENTS: 10,
  CLIENT_TIMEOUT: 120000,        
  ADMIN_PASSWORD: 'secret123',
  FILES_DIR: path.join(__dirname, '../files'),
  ADMIN_ROLE: 'admin',
  NORMAL_ROLE: 'normal'
};