
const dgram = require('dgram');
const fs = require('fs');
const path = require('path');
const http = require('http');

const PORT = 5000;       
const HOST = '127.0.0.1';
const HTTP_PORT = 8080;  
const MAX_CLIENTS = 5;
const CLIENT_TIMEOUT = 10000;