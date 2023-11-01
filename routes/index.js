const express = require("express");
const { Op } = require('sequelize')
const path = require('path');
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const nodemailer = require('nodemailer');
const { createTokens, validateToken } = require("./JWT");
const crypto = require('crypto');
var authRouter = require('./routes/auth');
var session = require('express-session');
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(express.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
require('./models');   // 导入模型定义
const { Member, ProductMain } = require('./models');
let productDatalist;
ProductMain.findAll().then(products => {
  // 在这里处理查询结果
  productDatalist = products.map((product, index) => {
    return {
      productLink: `/product/${index}`,
      imageUrl: product.image_url,
      imageUrlsquare: "https://via.placeholder.com/64x64",
      productName: product.name,
      productDescription: product.description,
      productDescriptionshort: product.specification,
      productDescriptionlong: product.specification,
      productstar: "4.0/5", // 这里的星级可以根据产品属性来设置
      productPrice: `$ ${product.price.toFixed(2)}`, // 保留两位小数的价格
      shoppingtag: "0", // 根据库存设置购物标签
      productindex: `${index}`,
      quantity: 1,
    };
  });
  
  // 输出替换后的 productDatalist
}).catch(error => {
  // 处理查询错误
  console.error('Error fetching products:', error);
});
const publicPath = path.join(__dirname, './views');
app.use('/auth', authRouter);
app.use('/', express.static(publicPath));
// Define your routes
let flag = 0 , page , limit;
app.get("/", async function(req, res)  {
  let productDatalisttemp;
  page = req.query.page;
  if (!page) {
    page = 1; // 如果没有提供 page 参数，则默认为 1
  }
  let limits = req.query.limit;
  limit = parseInt(limits);
  if (!limit) {
    limit = 6; // 如果没有提供 page 参数，则默认为 1
  }
  const offset = (page - 1) * limit; // 根据页码计算偏移量
  try {
    const products = await ProductMain.findAll({
      offset,
      limit,
    });
    productDatalisttemp = products.map((product, index) => {
      return {
        productLink: `/product/${index}`,
        imageUrl: product.image_url,
        imageUrlsquare: "https://via.placeholder.com/64x64",
        productName: product.name,
        productDescription: product.description,
        productDescriptionshort: product.specification,
        productDescriptionlong: product.specification,
        productstar: "4.0/5", // 这里的星级可以根据产品属性来设置
        productPrice: `$ ${product.price.toFixed(2)}`, // 保留两位小数的价格
        shoppingtag: "0", // 根据库存设置购物标签
        productindex: `${index}`,
        quantity: 1,
      };
    });

  } catch (error) {
    console.error('Error', error);
  }
  flag = 0;
  res.render("index", { productDatalisttemp });
});

app.get("/product/:productId", (req, res) => {
  const productId = req.params.productId;

  const productDetail = productDatalist.find(
      (product) => product.productindex === productId
  );

  if (productDetail) {
      res.render("product", { productDetail });
  } else {
      res.render("not_found"); // 針對無效的產品ID，可以渲染一個「未找到」的頁面
  }
});

app.get("/shoppingcar", (req, res) => {
  flag = 1;
  res.render("shoppingcar", { productDatalist });
});

app.get("/api/products", (req, res) => {
  const responseData = {
    products: productDatalist,
    flag: flag
  };
  res.json(responseData);
});

app.get('/search', async function(req, res)  {
  const keyword = req.query.keyword;
  const query = {}
  if (keyword) {
      query.name = {[Op.substring]: keyword}
  }
  const queries = {
    offset: (page - 1) * limit,
    limit
  }       

  const data = await ProductMain.findAndCountAll({
    where: query,
    ...queries
  })
  
  const products = data.rows; // 提取查询结果数组

  productDatalisttemp = products.map((product) => {
    return {
      productLink: `/product/${product.id}`,
      imageUrl: product.image_url,
      imageUrlsquare: "https://via.placeholder.com/64x64",
      productName: product.name,
      productDescription: product.description,
      productDescriptionshort: product.specification,
      productDescriptionlong: product.specification,
      productstar: "4.0/5", // 这里的星级可以根据产品属性来设置
      productPrice: `$ ${product.price.toFixed(2)}`, // 保留两位小数的价格
      shoppingtag: "0", // 根据库存设置购物标签
      productindex: `${product.id}`,
      quantity: 1,
    };
  });

  const responseData = {
    products: productDatalisttemp,
    flag: flag
  };
  res.json(responseData);
});
app.post("/api/update-products", (req, res) => {
  const updatedProductDataList = req.body;
  // Update your data source here, e.g., save to a database, etc.
  // For now, we'll just replace the current productDatalist with the updated list:
  productDatalist = updatedProductDataList;

  // Respond with a confirmation message
  res.json({ message: "Products updated successfully!" });
});

// app.get("/checkout", (req, res) => {
//   res.render("checkout", { pageTitle: "Checkout Page" });
// });

app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
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
  
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
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
});

app.get("/forget", (req, res) => {
  res.render("forget");
});

app.post("/forget", async (req, res) => {
  const { emailaddress } = req.body;

  const user = await Member.findOne({ where: { email: emailaddress } });

  if (!user) {
    res.json({ message: "User Doesn't Exist" });
  }
  else{
    const token = crypto.randomBytes(20).toString('hex');

    // Set the token and its expiry date in the user model
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;  // 1 hour

    // Save the user model
    await user.save();
    const transporter = nodemailer.createTransport({
      service: 'iCloud',  // 換成你使用的郵件服務
      auth: {
        user: 'howard1008@icloud.com',
        pass: 'Goodgood1008'
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
  
});

