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
});

module.exports = mongoose.model("news_feeds",newsFeedSchema)