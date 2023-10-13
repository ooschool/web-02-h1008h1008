const { Console } = require("console");
const express = require("express");
const exphbs = require("express-handlebars");
const path = require('path');
const app = express();
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
const publicPath = path.join(__dirname, './views');
app.use('/', express.static(publicPath));
// Define your routes
let productDatalist = [
  {
    productLink: "/product/0",
    imageUrl: "https://via.placeholder.com/159x200",
    imageUrlsquare: "https://via.placeholder.com/64x64",
    productName: "Product 1",
    productDescription: "Description 1",
    productDescriptionshort: "Description 1",
    productDescriptionlong: "Description 1",
    productstar: "4.0/5",
    productPrice: "$ 99.99",
    shoppingtag: "0",
    productindex: "0",
    quantity: 1,
  },
  {
    productLink: "/product/1",
    imageUrl: "https://via.placeholder.com/159x200",
    imageUrlsquare: "https://via.placeholder.com/64x64",
    productName: "Product 1",
    productDescription: "Description 1",
    productDescriptionshort: "Description 1",
    productDescriptionlong: "Description 1",
    productstar: "4.0/5",
    productPrice: "$ 99.99",
    shoppingtag: "1",
    productindex: "1",
    quantity: 1,
  },
  {
    productLink: "/product/2",
    imageUrl: "https://via.placeholder.com/159x200",
    imageUrlsquare: "https://via.placeholder.com/64x64",
    productName: "Product 1",
    productDescription: "Description 1",
    productDescriptionshort: "Description 1",
    productDescriptionlong: "Description 1",
    productstar: "4.0/5",
    productPrice: "$ 99.99",
    shoppingtag: "1",
    productindex: "2",
    quantity: 1,
  },
  {
    productLink: "/product/3",
    imageUrl: "https://via.placeholder.com/159x200",
    imageUrlsquare: "https://via.placeholder.com/64x64",
    productName: "Product 1",
    productDescription: "Description 1",
    productDescriptionshort: "Description 1",
    productDescriptionlong: "Description 1",
    productstar: "4.0/5",
    productPrice: "$ 99.99",
    shoppingtag: "1",
    productindex: "3",
    quantity: 1,
  },
  {
    productLink: "/product/4",
    imageUrl: "https://via.placeholder.com/159x200",
    imageUrlsquare: "https://via.placeholder.com/64x64",
    productName: "Product 1",
    productDescription: "Description 1",
    productDescriptionshort: "Description 1",
    productDescriptionlong: "Description 1",
    productstar: "4.0/5",
    productPrice: "$ 99.99",
    shoppingtag: "1",
    productindex: "4",
    quantity: 1,
  },
  {
    productLink: "/product/4",
    imageUrl: "https://via.placeholder.com/159x200",
    imageUrlsquare: "https://via.placeholder.com/64x64",
    productName: "Product 1",
    productDescription: "Description 1",
    productDescriptionshort: "Description 1",
    productDescriptionlong: "Description 1",
    productstar: "4.0/5",
    productPrice: "$ 99.99",
    shoppingtag: "1",
    productindex: "5",
    quantity: 1,
  },
  {
    productLink: "/product/4",
    imageUrl: "https://via.placeholder.com/159x200",
    imageUrlsquare: "https://via.placeholder.com/64x64",
    productName: "Product 1",
    productDescription: "Description 1",
    productDescriptionshort: "Description 1",
    productDescriptionlong: "Description 1",
    productstar: "4.0/5",
    productPrice: "$ 99.99",
    shoppingtag: "1",
    productindex: "6",
    quantity: 1,
  },
  // Add more product data objects as needed
];
let flag = 0;
app.get("/", (req, res) => {
  flag = 0;
  res.render("index", { productDatalist });
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
