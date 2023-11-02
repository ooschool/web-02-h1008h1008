const bcrypt = require("bcrypt");
const crypto = require('crypto');
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("../public/JWT");
const nodemailer = require('nodemailer');
const { Member} = require('../public/models');
const AuthController = {
    renderSignUpPageHandler: (req, res) => {
        res.render("register");
    },
    renderSignInPageHandler: (req, res) => {
        res.render('login')
    },
    renderforgetPageHandler: (req, res) => {
        res.render('forget')
    },
    LoginHandler: async (req, res) => {
        const { emailaddress, password } = req.body;
        const user = await Member.findOne({ where: { email: emailaddress } });

        if (!user) {
            res.json({ message: "User Doesn't Exist" });
        }
        else{
            const dbPassword = user.passhash;
            bcrypt.compare(password, dbPassword).then((match) => {
            if (!match) {
                res.json({ message: "Wrong Emailaddress and Password Combination!" });
            } else {
                const accessToken = createTokens(user);

                res.cookie("access-token", accessToken, {
                maxAge: 60 * 60 * 24 * 30 * 1000,
                httpOnly: true,
                });

                res.json({message:"LOGGED IN"});
            }
            });
        }
    },
    RegisterPageHandler: async (req, res) => {
        const { emailaddress, password } = req.body;
        bcrypt.hash(password, 10).then((hash) => {
            Member.create({
            email: emailaddress,
            name: null,
            address: null,
            phone_number: null,
            account: null,
            passhash: hash,
            options: null,
            })
            .then(() => {
            res.json("USER REGISTERED");
            })
            .catch((err) => {
            if (err) {
                res.status(400).json({ error: err });
            }
            });
        });
    },
    forgetHandler: async (req, res) => {
        const { emailaddress } = req.body;

        const user = await Member.findOne({ where: { email: emailaddress } });

        if (!user) {
            res.json({ message: "User Doesn't Exist" });
        }
        else{
            const token = crypto.randomBytes(20).toString('hex');

            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000;  

            await user.save();
            const transporter = nodemailer.createTransport({
            service: 'iCloud', 
            auth: {
                user: '',
                pass: ''
            }
            });
            
            const mailOptions = {
            from: 'howard1008@icloud.com',
            to: user.email,
            subject: '重設您的密碼',
            text: '點擊以下連結以重設您的密碼：\n\n' +
                    'http://yourwebsite.com/reset-password?token=' + user.resetPasswordToken +
                    '\n\n如果您沒有提出重設密碼的請求，請忽略此郵件。'
            };
        
            transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Error sending email: ' + error.message });
            }
            res.json({ message: 'Email sent: ' + info.response });
            });
        }
    },
}

module.exports = AuthController