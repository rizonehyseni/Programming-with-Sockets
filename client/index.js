const dgram = require('dgram');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const SERVER_IP = process.argv[2] || '127.0.0.1';
const SERVER_PORT = 41234;

const client = dgram.createSocket('udp4');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function send(msgObj) {
  const buf = Buffer.from(JSON.stringify(msgObj));
  client.send(buf, SERVER_PORT, SERVER_IP);
}


client.on('message', (msg, rinfo) => {
  try {
    const res = JSON.parse(msg.toString());
    console.log('\n=== Pergjigja nga Serveri ===');
    if (res.status === 'ok') {
      if (res.data && res.data.content) {
        const savePath = path.join(process.cwd(), res.data.filename);
        fs.writeFileSync(savePath, Buffer.from(res.data.content, 'base64'));
        console.log(`File u shkarkua dhe u ruajt si: ${res.data.filename}`);
      } else if (res.data) {
        console.dir(res.data, { depth: null });
      } else if (res.message) {
        console.log(res.message);
      }
    } else {
      console.log('Gabim:', res.message);
    }
  } catch (e) {
    console.log('Mesazhi nuk eshte parsuar: ', msg.toString());
  }
  prompt();
});