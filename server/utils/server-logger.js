const fs = require('fs');
const path= require('path');

const serverLogStream = fs.createWriteStream(path.join(path.normalize(__dirname+"/.."), '/logs/server.log'), {
    interval: '7d' // rotate weekly

  });
  module.exports = serverLogStream;



