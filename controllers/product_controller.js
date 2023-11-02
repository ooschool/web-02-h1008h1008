const {  ProductMain } = require('../public/models');
let productDatalist;
ProductMain.findAll().then(products => {
  productDatalist = products.map((product, index) => {
    return {
      productLink: `/product/${index}`,
      imageUrl: product.image_url,
      imageUrlsquare: "https://via.placeholder.com/64x64",
      productName: product.name,
      productDescription: product.description,
      productDescriptionshort: product.specification,
      productDescriptionlong: product.specification,
      productstar: "4.0/5", 
      productPrice: `$ ${product.price.toFixed(2)}`, 
      shoppingtag: "0", 
      productindex: `${index}`,
      quantity: 1,
    };
  });
  
}).catch(error => {
  console.error('Error fetching products:', error);
});

const { Op } = require('sequelize')
const ProductController = {
    renderIndexPageHandler: async (req, res) =>  {
        let productDatalisttemp;
        page = req.query.page;
        if (!page) {
            page = 1;
        }
        let limits = req.query.limit;
        limit = parseInt(limits);
        if (!limit) {
            limit = 6;
        }
        const offset = (page - 1) * limit;
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
                productstar: "4.0/5", 
                productPrice: `$ ${product.price.toFixed(2)}`, 
                shoppingtag: "0", 
                productindex: `${index}`,
                quantity: 1,
            };
            });

        } catch (error) {
            console.error('Error', error);
        }
        res.render("index", { productDatalisttemp , flag : '0'});
    },
    searchPageHandler: async (req, res) =>  {
        page = req.query.page;
        const keyword = req.body.searchTerm;
        if (!page) {
            page = 1;
        }
        let limits = req.query.limit;
        limit = parseInt(limits);
        if (!limit) {
            limit = 6;
        }
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
        
        const products = data.rows; 
        productDatalisttemp = products.map((product, index) => {
            return {
                productLink: `/product/${index}`,
                imageUrl: product.image_url,
                imageUrlsquare: "https://via.placeholder.com/64x64",
                productName: product.name,
                productDescription: product.description,
                productDescriptionshort: product.specification,
                productDescriptionlong: product.specification,
                productstar: "4.0/5", 
                productPrice: `$ ${product.price.toFixed(2)}`, 
                shoppingtag: "0", 
                productindex: `${index}`,
                quantity: 1,
            };
            

        }); 
        res.render("index", { productDatalisttemp , flag : '0'});
    },
    renderShooppingPageHandler: (req, res) => {
        cartProductList = productDatalist.filter(product => product.shoppingtag === '1')
        res.render("shoppingcar", { productDatalist , flag : '1'});
    },
    renderProductPageHandler: (req, res) => {
        const productId = req.params.productId;
        const productDetail = productDatalist.find(
            (product) => product.productindex === productId
        );
        if (productDetail) {
            res.render("product", { productDetail , flag : '0'});
        } else {
            res.render("not_found"); // 針對無效的產品ID，可以渲染一個「未找到」的頁面
        }
    },
}

module.exports = ProductController