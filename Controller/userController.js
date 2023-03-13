const User = require('../Models/userModel');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const crypto = require('crypto');
const JWT = require('jsonwebtoken');

const mailSender = require('../Utils/email');



   
const register =async(req,res)=>{
    try{
        const {username, email, password} = req.body;
        const  users = await User.findOne({"email":email});
        if(!users){
            const user = new User();
            user.username = username;
            user.password = await bcrypt.hash(password,salt);
            user.email = email;
            
            user.update_ts = Date.now(); 

            user.save();
            console.log(user);
            res.json({status:true,message:"User Registered Successfuly",data:user});
            
        }
        else{
            res.json({status:false,message:"Already Registered"});
        }

    }
    catch(err){
        console.log(err);
        res.json({status:false,message:"Something wenrt wrong"});

    
    }

}
const ActivateEmail = async(req,res)=>{
    try{
        const {email} = req.body;
        const users = await User.findOne({email:email});
        console.log(users);
        if(users){
            users.activeToken = crypto.randomBytes(32).toString("hex");
            users.activeExpires=Date.now() + 24 * 3600 * 1000;
             
            
            const link = `${process.env.BASE_URL}/users/activate/${users.activeToken}`;
          

            
            const emailobj = {
                from:'CSI highschool21@gmail.com',
                subject:'Thanks for registering and click for activation mail',
                to:users.email,
               text:link

            }
            mailSender(emailobj);
            console.log(users);
            users.save();
            res.json({status:true,message:"User Activation Link sent Successfully",data:users});
        }
        else{
            res.json({status:false,message:"Activation Link expired or Invalid Link"});
        }


    }
    catch(err){
        console.log(err);
        res.json({status:false,message:"Something went wrong"});
    }
}
const CheckActivation = async(req,res) =>{ 
    try{
        const users = await User.findOne({activeToken:req.params.activeToken});
        
        if(users){
            users.isVerified = true;
            users.save();
            console.log(users);
            res.json({status:true,message:"User Activated account Successfully",data:users});
        }
        else{
            res.json({status:false,message:"Cannot Activate the account"});
        }

    }
    catch(err){
        console.log(err);
        res.json({status:false,message:"Something went wrong"});
    }
} 


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, isVerified: true });
    if (user) {
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (isPasswordMatched) {
            const token = JWT.sign(
            {
                id: user._id,
                email: user.email,
                password: user.password,
            },
            process.env.JWT_TOKEN,
            { expiresIn: "2h" }
            );
            console.log(token);
            res.json({status: true,message: "User Loggedin Successfully",data: user,user_token: token});
            console.log(user);
        } 
        else {
            res.json({ status: false, message: "Invalid email or password" });
        }
    } else {
      res.json({ status: false, message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: "Something went wrong" });
  }
};

const forgot = async(req,res)=>{
    try{
        
        const users = await User.findOne({email:req.body.email});
        console.log(users);
        const reset = crypto.randomBytes(32).toString("hex");

        if(users){
            users.isVerified = false;
            
            users.resetToken = crypto.createHash("sha256").update(reset).digest("hex");
            users.resetExpires = Date.now() + 24 * 3600 * 1000;

            const link = `${process.env.BASE_URL}/reset/${users.resetToken}`;

            const emailobj = {
                from:'CSI highschool21@gmail.com',
                subject:'Password Recovery Mail',
                to:users.email,
                text:link

            }
            mailSender(emailobj);
            users.save();
            res.json({status:true,message:"User Password Reset Link sent Successfully",data:users});
 
        }
        else{
            res.json({status:faslse,message:"Password Reset Link Invalid or Expired"});
        }
    }
    catch(err){
        console.log(err);
        res.json({status:false,message:"Something went wrong"});
    }
    

}


const reset =async(req,res)=>{
    try {
        const {password} =req.body;
        
        const user = await User.findOne({ resetToken: req.params.resetToken});
        if (user) {
            
            user.isVerified = true;
            bcrypt.hash(password, salt, function (err, hash) {
                user.password = hash
                user.update_ts = Date.now()
                user.save();
            });
            console.log(user);
          
            res.json({ status: true, message: "User  Password Reseted Successfully",data:user});
        }
        else {
            res.json({ status: false, message: " User  Password Reset is  invalid Link or expired.Please try again"});
        }
    } 
    catch(err){
        console.log(err);
        res.json({status:false,message:"Something went wrong"});
    }

}

       
module.exports = { register,ActivateEmail,CheckActivation,forgot,reset,login };