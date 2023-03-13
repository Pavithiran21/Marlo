const mongoose = require("mongoose");
const LoginSchema = new mongoose.Schema({
    Firstname:{
        type:String,
        required:true
    },
    Lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String
    },
    PhoneNumber:{
        type:Number,
        required: true,
        default: false
    },
    CompanyName:{
        type:String,
        require:false,
    },
    Occupation:{
        type:String,
        require:false,
    },
    update_ts:{
        type:Date,
        default:Date.now()
    },  
},
{
    timestamps: true
});

module.exports = mongoose.model('Login', LoginSchema);