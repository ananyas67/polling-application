const { SchemaTypes } = require('mongoose');
const connection = require('../connection');
const UserModel = require('../models/user-schema').UserModel;

const Schema = connection.Schema;

const optionSchema = new Schema({
  'option':{type: SchemaTypes.String},
  'votes':{type: SchemaTypes.Number, default: 0}
});

const pollSchema = new Schema({
    'user':{type: SchemaTypes.ObjectId, ref:'users'},
    'created':{type: SchemaTypes.Date, default: Date.now},
    'question':{type: SchemaTypes.String},
    'options':[optionSchema],
    'voted':[{type: SchemaTypes.ObjectId, ref:'users'}]
    

});
const PollModel = connection.model('polls',pollSchema);

  module.exports = PollModel;
