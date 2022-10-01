const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  username:{
    type :String, 
    required:true
  },
  email:{
    type :String, 
    required:true
  },
  requests:{
    type:Array,
    required:true,
    default:[]
  }
});

module.exports = mongoose.model("Invitation",invitationSchema)