const { Router } = require('express')
const AuthController = require('../controllers/auth_controller.js')
const ProductController = require('../controllers/product_controller.js')
const ApiController = require('../controllers/api_controller.js')
const {  validateToken } = require("../controllers/JWT");
const appRouter = Router()

appRouter.get('/', ProductController.renderIndexPageHandler)
appRouter.get('/shoppingcar', ProductController.renderShooppingPageHandler)
appRouter.get('/product/:productId', ProductController.renderProductPageHandler)

appRouter.get('/api/products', ApiController.returnProductHandler)
appRouter.post('/api/update-products', ApiController.updateProductHandler)

appRouter.get('/login', AuthController.renderLoginPageHandler)
appRouter.post('/login', AuthController.LoginHandler)
appRouter.get('/logout', AuthController.renderlogoutPageHandler)
appRouter.get('/register', AuthController.renderRegisterPageHandler)
appRouter.post('/register', AuthController.RegisterPageHandler)
appRouter.get('/forget', AuthController.renderforgetPageHandler)
appRouter.post('/forget', AuthController.forgetHandler)
appRouter.get('/reset',  AuthController.renderResetPageHandler)
appRouter.post('/reset', AuthController.RegisterPageHandler)
appRouter.get('/profile', validateToken, AuthController.renderprofilePageHandler);
// app.get("/checkout", (req, res) => {
//   res.render("checkout", { pageTitle: "Checkout Page" });
// });

module.exports = appRouter


