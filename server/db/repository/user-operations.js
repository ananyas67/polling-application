const UserModel = require('../models/user-schema').UserModel;
module.exports = {
    async add(userObject){
        const doc = await UserModel.create(userObject);
        return doc;
    },
    async find(userObject){
        const doc = await UserModel.findOne({'email':userObject.email, 'password':userObject.password}).exec();
        return doc;
    },
    async findId(userObject){
        const doc = await UserModel.findById(userObject).exec();
        return doc;
    },
    async findIdd(userObject){
        const doc = await UserModel.findById(userObject).populate('polls');
        return doc;
    }
    // async pass(userObject){
    //     const doc = await UserModel.findOne({password:userObject.password});
    //     return(doc);
    // }
}
