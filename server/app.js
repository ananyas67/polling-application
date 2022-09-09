const express = require('express');
// const chalk = require('chalk'); // Terminal Style
const dotenv  = require('dotenv'); // env file read
const {HOME} = require('./utils/config/app-constants').ROUTES;
dotenv.config(); // read all the key from .env file and load in process.env
const app = express();
const morgan = require('morgan');
const logger= require('./utils/app-logger')(__filename);

const serverLogStream = require('./utils/server-logger');
// process.on('uncaughtException', (err)=>{
//     //email + sms(not free) + log
// });
// process.on('exit',()=>{

// });

app.use(morgan('combined',{stream:serverLogStream}));
app.use(express.json());
app.use(HOME, require('./api/v1/routes/users'));
app.use(HOME, require('./api/v1/routes/poll'));

const server= app.listen(process.env.PORT || 1234,err=>{
    if(err){
        console.log(chalk.red('Server Crash '+JSON.stringify(err)));
    }
    else{
        logger.debug('Server Start At '+ server.address().port );
        console.log(('Server Started at '+server.address().port));
    }
})