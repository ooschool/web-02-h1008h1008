const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const { Op } = require('sequelize')
const path = require('path');
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("./JWT");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 8000;
app.use(express.static("public"));
app.use(express.json());
// Set up Handlebars as the view engine
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.engine('handlebars', exphbs.engine({
  helpers: {
    eq: function(a, b, options) {
      return a === b ? options.fn(this) : options.inverse(this);
    }
  }
}));
app.set("view engine", "handlebars");
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
  let lastMemberId
  Member.findOne({
    order: [['id', 'DESC']],
    attributes: ['id']
  }).then(lastMember => {
    if (lastMember) {
      lastMemberId = parseInt(lastMember.id) + 1;
    } else {
      console.log('No records in the member table');
    }
  });
  bcrypt.hash(password, 10).then((hash) => {
    Member.create({
      id: lastMemberId.toString(),
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
    
  }
  
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
