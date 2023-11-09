const bcrypt = require("bcrypt");
const { createTokens, createresetTokens, validateresetToken } = require("./JWT");
const nodemailer = require('nodemailer');
const { Member , Cart ,CartProduct } = require('../models/modelsforapp');
const AuthController = {
    renderRegisterPageHandler: (req, res) => {
        res.render("register");
    },
    renderLoginPageHandler: (req, res) => {
        const token = req.cookies["access-token"];
        if(validateresetToken(token)){
            res.render('index')
        }
        else{
            res.render('login')
        }
    },
    renderforgetPageHandler: (req, res) => {
        res.render('forget')
    },
    renderlogoutPageHandler: (req, res) => {
        res.clearCookie('access-token');
        res.render('index');
    },
    renderResetPageHandler: (req, res) => {
        if(validateresetToken(req.query.token)){
            res.render('reset');
        }
        else{
            return res.status(400);
        }
    },
    LoginHandler: async (req, res) => {
        const { emailaddress, password } = req.body;
        const user = await Member.findOne({ where: { email: emailaddress } });

        if (!user) {
            res.json({ message: "User Doesn't Exist" });
        }
        else{
            const dbPassword = user.passhash;
            bcrypt.compare(password, dbPassword).then(async (match) => {
                if (!match) {
                    res.json({ message: "Wrong Emailaddress and Password Combination!" });
                } 
                else {
                    console.log(user.id)
                    const existingCart = await Cart.findOne({ where: { member_id: user.id } });
                    if (!existingCart) {
                        await Cart.create({
                            member_id: user.id,
                        });
                    }
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
            const accessToken = createresetTokens(user);

            const {
            refresh_token,
            access_token,
            } = req.session.tokens;
            
        
            const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'howard900100@gmail.com',
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: refresh_token,
                accessToken: access_token,
            },
            });
        
            
            const mailOptions = {
            from: 'howard900100@gmail.com',
            to: user.email,
            subject: '重設您的密碼',
            text: '點擊以下連結以重設您的密碼：\n\n' +
                    'http://localhost:3000/reset?token=' + accessToken +
                    '\n\n如果您沒有提出重設密碼的請求，請忽略此郵件。'
            };
        
            transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error sending email');
            } else {
                console.log(info);
                res.send('Email sent');
            }
            });
        }
    },
    renderprofilePageHandler: async (req, res) => {
        res.render('index')
    },
}

module.exports = AuthController