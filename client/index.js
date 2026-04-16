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