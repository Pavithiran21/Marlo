const nodemailer = require('nodemailer');


const mailSender = async (emailobj) => {
    
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service :'gmail',
 
        auth : {
            user : process.env.EMAIL_USERNAME,
            pass : process.env.EMAIL_PASSWORD
        }
    });

    await transporter.sendMail(emailobj);
    console.log("Email sent successfully");
};

module.exports = mailSender