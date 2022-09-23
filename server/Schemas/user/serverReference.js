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
  servers : {
    type:Array,
    required:true,
    default : []
  }
});

module.exports = mongoose.model("server_reference",serverReferenceSchema)