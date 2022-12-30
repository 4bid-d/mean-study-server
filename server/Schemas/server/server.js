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
  },
  feeds : [
    {
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      default : [],
      ref:"news_feeds"
    }
  ],
});

module.exports = mongoose.model("servers",serverSchema)