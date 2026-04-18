module.exports = {
  generateClientKey(rinfo) {
    return `${rinfo.address}:${rinfo.port}`;
  },

  sendMessage(socket, rinfo, obj) {
    const buf = Buffer.from(JSON.stringify(obj));
    socket.send(buf, 0, buf.length, rinfo.port, rinfo.address, (err) => {
      if (err) console.error("Gabim gjate dergimit:", err);
    });
  },
};
