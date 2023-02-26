const mongoose = require('mongoose');

const newsFeedSchema = new mongoose.Schema({
  content:{
    type :String, 
    required:true
  },

  createdBy:{
    type:mongoose.Schema.Types.String,
    required:true,
  },

  image:{
    type:String
  },

  comments : [
      {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        default : [],
        ref:"comments"
      }
  ]
});

module.exports = mongoose.model("news_feeds",newsFeedSchema)