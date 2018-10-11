var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  name: {
      type:String,
      required:true
  },
  location: {
      type:String,
      required:true
  },
  adress: {
      type:String,
      required:true      
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'      
  }
});

var Event = mongoose.model('Event', eventSchema);

module.exports=Event
