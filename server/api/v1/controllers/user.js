const userRepo= require('../../../db/repository/user-operations');
const {SUCCESS,INTERNAL_SERVER_ERROR, NOT_FOUND} =  require('../../../utils/config/app-constants').STATUS_CODE;
const language = require('../../../utils/i18n/en.json');
const jwt = require('jsonwebtoken');

module.exports = {
   async login(request, response){
       //Date.now()
       let userObject = request.body;
       const result =  await userRepo.find(userObject);
       const {_id, username} = result;
       //const valid = await result.comparePassword(request.body.password);
       try{
       if(result && result.email){
           const token = jwt.sign({_id, username}, process.env.SECRET); 
           response.status(SUCCESS).json({message:language['login.success.message'], _id, username, token});
       }
       else{
           response.status(NOT_FOUND).json({message:language['login.success.fail']});
       }
   }
   catch(err){
       response.status(INTERNAL_SERVER_ERROR).json({message:language['server.error']});
           console.log('Login ', err);
   }

   },
   async register(request, response){
       let userObject = request.body;
       const result =  await userRepo.add(userObject);
       const {_id, username} = result;
       //const token = jwt.sign({_id, username}, 'SECRET'); 
       try{
       if(result && result.email){
           const token = jwt.sign({_id, username}, process.env.SECRET); 
           response.status(SUCCESS).json({message:language['register.success.message'], _id, username, token});
       }
       else{
           response.status(NOT_FOUND).json({message:language['register.fail.message']});
       }
   }
       catch(err){
           response.status(INTERNAL_SERVER_ERROR).json({message:language['server.error']});
           console.log('Register ',err);
       }
   }
}