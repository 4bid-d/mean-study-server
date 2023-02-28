const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const RequestsSchema = new mongoose.Schema({
  username:{
    type :String, 
    required:true
  },
  email:{
    type :String, 
    required:true
  },
  requests:[
    {
      by:String,
      id:String,
      server:{
        name:{
            type : String
        },
        id : {
          type : mongoose.Schema.Types.ObjectId
        }
      },
    }
  ]
});

module.exports = mongoose.model("Requests",RequestsSchema)