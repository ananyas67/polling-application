const PollModel = require('../models/poll-schema');
const mongoose = require('mongoose');
const UserModel = require('../models/poll-schema');

module.exports = {
    async add(pollObject){
        const doc = await PollModel.create(pollObject);
        return doc;
    },
    async find(uid){
        console.log('UID is ', uid);
        const docs = await PollModel.find().populate('user', ['username', '_id']);
        //const docs = await PollModel.find({'user': mongoose.Types.ObjectId(uid)}).populate('user').exec();
        //const docs = PollModel.find({}, undefined, { populate: {path: 'users',match:{_id:uid}, options: {strictPopulate: false}}, option: {strictPopulate: false}, }).exec()
        return docs;
    },
    async findIddd(pollObject){
        const doc = await PollModel.find(pollObject);
        console.log(doc);
        return doc;
    }
}