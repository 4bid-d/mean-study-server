const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
  name:{
    type :String, 
    required:true
  },
  admin:{
    username:String
  }
});

module.exports = mongoose.model("servers",serverSchema)