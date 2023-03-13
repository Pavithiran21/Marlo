const Login = require('../Models/loginModel');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const createEmployee = async(req,res)=>{
    try{
        const {firstname,lastname,email,password,phone,companyname,occupation} =req.body;
        
        
        const NewLogin = await Login.findOne({"email":email});
        console.log(NewLogin);
        if(!NewLogin){
            const log = new Login({
                firstname,lastname,email,phone,password,companyname,occupation
            });
           
            log.password = await bcrypt.hash(password,salt);
            
            
            res.json({status:true,message:"Contact Profile Created Successfully",data:log});
        }
        else{
            res.json({status:false,message:"Contact Profile Already exists"});
        }
    }
    catch(err){
        console.log(err);
        res.json({status:false,message:"Something wenrt wrong"});
    }
}
const updateEmployee = async(req,res)=>{
    try{
      
        const employee = await Login.findByIdAndUpdate({_id:req.params.id},{new:true}); 
        if(employee){
            res.json({status:true,message:"Contact Profile Updated Successfully",data:employee});
        }else{
           res.json({status:false,message:"Contact Profile cannot update it"});
        }
    }
    catch(err){
        console.log(err);
        res.json({status:false,message:"Something wenrt wrong"});
    }

}
const SingleEmployeeList = async(req,res)=>{
    try{
        const dataes = req.params.id;
        const emp = await Login.findOne({_id:dataes});
        
        if(emp){
            res.json({status:true,message:"Contact of Single user viewed Successfully",data:dataes})
        }
        else{
            res.json({status:false,message:" Contact cannot viewed or invalid"});
        }
    }
    catch(err){
        console.log(err);
        res.json({status:false,message:"Something wenrt wrong"});
    }

}
const AllEmployeeList = async(req,res)=>{
    try{
        
        const allcontact = await Login.find({});
        
        if(allcontact){
            res.json({status:true,message:"All Contact Viewed  Successfully"})
        }
        else{
            res.json({status:false,message:"All Contact cannot view or invalid"});
        }

    }
    catch(err){
        console.log(err);
        res.json({status:false,message:"Something wenrt wrong"});
    }

}
const  deleteEmployee = async(req,res)=>{
    try{
        const id = req.params.id;
        const contact = await Login.findByIdAndDelete({_id:id});
      
        if(contact){
            res.json({status:true,message:"Contact Profile Deleted Successfully",data:id});
        }
        else{
            res.json({status:false,message:"Contact Profile doesn't exists"});
            
        }
        
    }
    catch(err){
        console.log(err);
        res.json({status:false,message:"Something wenrt wrong"});
    }

}
module.exports = {
   createEmployee,updateEmployee,SingleEmployeeList,deleteEmployee,AllEmployeeList
}
   