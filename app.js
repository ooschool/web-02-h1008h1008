const express = require("express");
const exphbs = require("express-handlebars");
const path = require('path');
const app = express();
const port = 8000;
app.use(express.static("public"));
// Set up Handlebars as the view engine
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
const publicPath = path.join(__dirname, './views');
app.use('/', express.static(publicPath));
// Define your routes
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/product", (req, res) => {
  res.render("product");
});

app.get("/shoppingcar", (req, res) => {
  res.render("shoppingcar", { pageTitle: "Cart Page" });
});

// app.get("/checkout", (req, res) => {
//   res.render("checkout", { pageTitle: "Checkout Page" });
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
