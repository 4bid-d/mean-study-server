const mongoose = require('mongoose');

const serverReferenceSchema = new mongoose.Schema({
  username :{
    type :String, 
    required:true
  },
  email:{
    type :String, 
    required:true
  },
  servers : [
    {
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      default : [],
      ref:"servers"
    }
  ],
  joinedServers : [
    {
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      default : [],
      ref:"servers"
    }
  ]
});

module.exports = mongoose.model("server_reference",serverReferenceSchema)