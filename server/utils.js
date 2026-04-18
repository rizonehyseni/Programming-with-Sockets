module.exports = {
  generateClientKey(rinfo) {
    return `${rinfo.address}:${rinfo.port}`;
  },

  sendMessage(socket, rinfo, obj) {},
};
