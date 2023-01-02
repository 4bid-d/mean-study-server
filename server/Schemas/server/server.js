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
  adminKey:{
    type:mongoose.Schema.Types.ObjectId,
    default:mongoose.Types.ObjectId(), 
    required:true
  },
  members:[
    {
      memberName:{
        type:String,
        required:true
      },
      adminStatus:{
        type:Boolean,
        default:false
      },
      you:{
        type:Boolean,
        default:false
      }
    }
  ],
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