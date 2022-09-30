const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
  name:{
    type :String, 
    required:true
  },
  serverId:{
    type :String, 
    required:true
  },
  admin:{
    type :String, 
    required:true
  },
  members:{
    type:Array,
    required:true,
    default:[]
  }
});

module.exports = mongoose.model("servers",serverSchema)