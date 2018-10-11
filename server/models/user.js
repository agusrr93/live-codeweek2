var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const validate = require('mongoose-validator');
const uniqueValidator = require('mongoose-unique-validator');
const encrypt = require('../helpers/encrypt')


const passValidator = [
  validate({
      validator: 'isLength',
      arguments: [6, 16],
      message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters',
    })
]

var userSchema = new Schema({
  name: {
      type:String,
      required:true
  },
  email: {
    type:String,
    required:true,
    unique:true
  },
  password: {
    type:String,
    required:true,
    validate:passValidator
  }
});

userSchema.plugin(uniqueValidator)

userSchema.pre('save', function(next) {
  this.password = encrypt.hashPassword(this.password, this.email)
  next()
})

var User = mongoose.model('User', userSchema);

module.exports=User