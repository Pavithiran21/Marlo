const JWT = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(token);
        if (token) {
           
            JWT.verify(token, process.env.JWT_TOKEN, function(error,decode){
                if(error){
                    res.json({status:false,message:"Invalid Token"});
                }
                else{
                    console.log(decode);
                    req.userid = decode.id;
                    next();

                }
            });
            
            
        } else {
            res.json({status:false,message:"Need new Token and Access Denied"});
        }
       
    } catch (error) {
        res.json({status:false,message:"Something went wrong"});
    }
}

module.exports = authenticate;