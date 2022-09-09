const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL,{maxPoolSize:5},err=>{
    if(err){
        console.log('Error During DB Connection ', err);
    }
    else{
        console.log('Connection Created ...');
    }
});
module.exports = mongoose;