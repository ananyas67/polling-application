const pollRepo= require('../../../db/repository/poll-operations');
const {SUCCESS,INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED} =  require('../../../utils/config/app-constants').STATUS_CODE;
const language = require('../../../utils/i18n/en.json');
const userRepo = require('../../../db/repository/user-operations');

module.exports = {
    async createPoll(request, response, next){
    //    let pollObject = request.body;
    //    const result =  await pollRepo.add(pollObject);
    //    const result = request.body;
    //    const {question, option} = result;
       try{
        const {_id} = request.decoded;
        const user = await userRepo.findId(_id);

        const {question, options} = request.body;
    
        const poll = await pollRepo.add({
        question,
        user,
        options: options.map(option => ({option, votes: 0}))
       }); 

       user.polls.push(poll._id);
       await user.save();
 
       if(poll && poll._id){
           response.status(SUCCESS).json({message:language['cart.added'], ...poll._doc, user: user._id});
       }
       else{
           response.status(NOT_FOUND).json({message:language['cart.added.fail']});
       }
   }
    catch(err){
       response.status(INTERNAL_SERVER_ERROR).json({message:language['server.error']});
       console.log('Add to Poll ', err);
   }
 
   },
   async viewPoll(request, response, next){
       const userid= request.query.userid; 
       
       const result =  await pollRepo.find(userid);
    
       try{
       if(result && result.length>0){
           response.status(SUCCESS).json({polls:result});
       }
       else{
           response.status(NOT_FOUND).json({polls:result});
       }
   }
       catch(err){
           response.status(INTERNAL_SERVER_ERROR).json({message:language['server.error']});
           console.log('View Polls ', err);
       }
   },
   async userPolls(request, response, next){
    try {
        const {_id} = request.decoded;
        const user = await userRepo.findIdd(_id);

        response.status(SUCCESS).json(user.polls);
    } catch (err) {
        response.status(INTERNAL_SERVER_ERROR).json({message:language['server.error']});
        console.log('User Polls ', err);
    }
   },
   async getPoll(request, response, next){
    try {
        const {_id} = request.params;
        const poll = await pollRepo.find(_id);
        if(!poll){
            response.status(NOT_FOUND).json({message:'NoPollFound'});
        } else {
            response.status(SUCCESS).json(poll);
        }
    } catch (err) {
        response.status(INTERNAL_SERVER_ERROR).json({message:language['server.error']});
        console.log('User Polls ', err);
    }
   },
   async deletePoll(request, response, next){
    try {
        const {_id: pollId} = request.params;
        const {_id: userId} = request.decoded;
 
        const poll = await pollRepo.findIddd(pollId);
        if (!poll) {
            response.status(NOT_FOUND).json({message:'NoPollFound', poll});
        } 
        if (poll.user !== userId) {
            response.status(UNAUTHORIZED).json({message:'UNAUTHORIZED', poll});
        }

        await poll.remove();
        response.status(SUCCESS).json(poll);
    } catch (err) {
        response.status(INTERNAL_SERVER_ERROR).json({message:language['server.error']});
        console.log('User Polls ', err);
    }
   },
   async vote(request, response, next){
    try {
        const {_id: pollId} = request.params;
        const {_id: userId} = request.decoded;
        const {answer} = request.body;

        if(answer){
            const poll = await pollRepo.findIddd(pollId);
            if(!poll){
                response.status(NOT_FOUND).json({message:'NoPollFound', poll});
            }

            const vote = poll.options.map(
                option => {
                    if(option.option === answer){
                        return{
                            option: option.option,
                            _id: option._id,
                            votes: option.votes + 1
                        };
                    } else {
                        return option;
                    }
                }
            );

            if(poll.voted.filter(user => 
                user.toString() === userId).length <= 0){
                    poll.voted.push(userId);
                    poll.option = vote;
                    await poll.save();

                    request.status(SUCCESS).json(poll);
                } else {
                    response.status(NOT_FOUND).json({message:'Already voted'});
                }
        } else {
            response.status(NOT_FOUND).json({message:'No answer Provided'});
        }
    } catch (err) {
        response.status(INTERNAL_SERVER_ERROR).json({message:language['server.error']});
        console.log('User Polls ', err);
    }
   }
}