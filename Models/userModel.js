const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    },

    isVerified:{
        type:Boolean,
        required: true,
        default: false
    },
    activeToken:{
        type:String,
        require:false,
        
    },
    activeExpires:{
        type:Date
    },
    resetToken:{
        type:String,
        require:false,
    },
    resetExpires:{
        type:Date
    },
    update_ts:{
        type:Date,
        default:Date.now()
    },  
},
{
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);