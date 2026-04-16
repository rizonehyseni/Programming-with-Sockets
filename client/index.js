const dgram = require('dgram');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const SERVER_IP = process.argv[2] || '127.0.0.1';
const SERVER_PORT = 41234;