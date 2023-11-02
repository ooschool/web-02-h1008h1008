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
const ApiController = {
    returnProductHandler: async (req, res) => {
      var productDatalist;
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
        const responseData = {
            products: productDatalist,
          };
        res.json(responseData);
    },
    updateProductHandler: (req, res) => {
        const updatedProductDataList = req.body; 
        productDatalist = updatedProductDataList; 
        res.json({ message: "Products updated successfully!" });
    },
}

module.exports = ApiController