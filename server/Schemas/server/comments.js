const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
  content:{
    type :String, 
    required:true
  },

  createdBy:{
    type:mongoose.Schema.Types.String,
    required:true,
  }
});

module.exports = mongoose.model("comments",commentsSchema)
