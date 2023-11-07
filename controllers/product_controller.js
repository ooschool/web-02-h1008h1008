const {  ProductMain , Cart , CartProduct} = require('../public/models');
const { verify } = require("jsonwebtoken");
var productDatalist;
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
function checktoken(token) {
    if(token){
        console.log(555)
        verify(token, 'jwtsecretplschange', async (err, decoded) => {
            if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
            }
            var memberId = decoded.id;
            if(memberId){
                const Cart1 = await Cart.findOne({ where: { member_id: memberId } });
                const existtable = await CartProduct.findOne({ where: { cart_id: Cart1.id } });
                if(existtable){
                    const productCountMap = existtable["product_id_and_count"];
                    console.log(productCountMap)
                    productDatalist.forEach((product) => {
                        const productId = product.productindex;
                        if (productCountMap.hasOwnProperty(productId)) {
                            product.shoppingtag = '1';
                            product.quantity = productCountMap[productId];
                        }
                    }); 
                }
                else{
                    await CartProduct.create({
                    cart_id: Cart1.id,
                    product_id_and_count : null,
                    }); 
                }
            }
        });
    }
    return productDatalist;
}
const { Op } = require('sequelize')
const ProductController = {
    renderIndexPageHandler: async (req, res) =>  {
        let productDatalisttemp , products;
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
        const keyword = req.query.search?.trim();
        if (keyword) {
            const query = {}
            query.name = {[Op.substring]: keyword}
            const queries = {
                offset: (page - 1) * limit,
                limit
            }       
    
            const data = await ProductMain.findAndCountAll({
                where: query,
                ...queries
            })
            products = data.rows; 
        }
        else{
            products = await ProductMain.findAll({
                offset,
                limit,
            });
        }
        
        try {
            
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
    renderShooppingPageHandler: (req, res) => {
        const token = req.cookies["access-token"];
        productDatalist = checktoken(token);
        cartProductList = productDatalist.filter(product => product.shoppingtag === '1')
        console.log(123)
        res.render("shoppingcar", { cartProductList , flag : '1'});
    },
    renderProductPageHandler: (req, res) => {
        const productId = req.params.productId;
        const productDetail = productDatalist.find(
            (product) => product.productindex === productId
        );
        if (productDetail) {
            res.render("product", { productDetail , flag : '0'});
        } else {
            res.render("not_found"); 
        }
    },
}

module.exports = ProductController