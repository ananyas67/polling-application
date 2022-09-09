const { SchemaTypes } = require('mongoose');
const connection = require('../connection');
const joi = require('joi');
const bcrypt = require('bcryptjs');
const {USERS} = require('../../utils/config/app-constants').SCHEMAS;
const Schema = connection.Schema;

const userSchema = new Schema({
    'username':{type: SchemaTypes.String, required: [true, 'Please enter a username'], unique: true},
    'email':{type: SchemaTypes.String, required: [true, 'Please enter a email'], unique: true},
    'password':{type: SchemaTypes.String, required: [true, 'Please enter a password']},
    'polls':[{type: SchemaTypes.ObjectId, ref:'polls'}],
    'created':{type: Date, default:Date.now}
     
});

const UserModel = connection.model(USERS, userSchema); // Schema --> collection 

const validateUser = (user) => {
    const schema = joi.object({
      email: joi.string().email().min(5).max(500).required(),
      password: joi.string().min(8).max(1024).required(),
      username: joi.string().min(1).max(13).required(),
    })
    return schema.validate(user)
  }

userSchema.pre('save', async function(next){
  try {
    if(!this.isModified('password')){
      return next();
    }
    const hashed = await bcrypt.hash(this.password, 10);
    console.log('hashed password', hashed);
    this.password = hashed;
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function(attempt, next){
  try {
    return await bcrypt.compare(attempt, this.password);
  } catch (error) {
    return next(error);
  }
};

  module.exports = {
    UserModel,
    validateUser
  }