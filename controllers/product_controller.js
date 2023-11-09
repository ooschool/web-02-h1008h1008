const {  ProductMain , Cart , CartProduct} = require('../models/modelsforapp');
const { verify } = require("jsonwebtoken");
async function getproduct(){
    let productDatalist;
    await ProductMain.findAll().then(products => {
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
    return productDatalist;
}

async function checktoken(token, productDatalist) {
    if (token) {
        try {
            const decoded = await new Promise((resolve, reject) => {
                verify(token, 'jwtsecretplschange', (err, decoded) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(decoded);
                    }
                });
            });

            const memberId = decoded.id;
            if (memberId) {
                const Cart1 = await Cart.findOne({ where: { member_id: memberId } });
                const existtable = await CartProduct.findOne({ where: { cart_id: Cart1.id } });
                if (existtable) {
                    const productCountMap = existtable["product_id_and_count"];
                    productDatalist.forEach((product) => {
                        const productId = product.productindex;
                        if (productCountMap && productCountMap.hasOwnProperty(productId)) {
                            product.shoppingtag = '1';
                            product.quantity = productCountMap[productId];
                        }
                    });
                    return productDatalist;
                } else {
                    await CartProduct.create({
                        cart_id: Cart1.id,
                        product_id_and_count: null,
                    });
                }
            }
        } catch (err) {
            console.error(err);
            return res.status(401).json({ message: 'Unauthorized' });
        }
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
    renderShooppingPageHandler:  async (req, res) => {
        const token = req.cookies["access-token"];
        let productDatalist = await getproduct();
        productDatalistnew = await checktoken(token , productDatalist);
        cartProductList = productDatalistnew.filter(product => product.shoppingtag === '1')
        res.render("shoppingcar", { cartProductList , flag : '1'});
    },
    renderProductPageHandler: async (req, res) => {
        const productId = req.params.productId;
        let productDatalist = await getproduct();
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