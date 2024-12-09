const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
       username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
       } ,
       email :{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
       },
       password:{
        type: String,
        required: true,
        
       },
       credit: {
        type: Number,
        default: 5,
       },
       
       posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
       ],

     }
     ,{
        timestamps:true,
         
    }
);

const User = mongoose.model("Post", userSchema);
module.exports = User; 