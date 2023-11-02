const Sequelize = require('sequelize');

const sequelize = new Sequelize('web', 'root', 'Goodgood1008', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql'
});

const Member = sequelize.define('member', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  email: Sequelize.STRING,
  name: Sequelize.STRING,
  address: Sequelize.STRING,
  phone_number: Sequelize.STRING,
  account: Sequelize.STRING,
  passhash: Sequelize.STRING,
  options: Sequelize.JSON,
}, {
  tableName: 'member', 
});

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  member_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  datetime: Sequelize.DATE,
});

const OrderLog = sequelize.define('order_log', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  member_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  datetime: Sequelize.DATE,
  pay_status: Sequelize.BOOLEAN,
  ship_status: Sequelize.STRING,
  ship_to_address: Sequelize.STRING,
  ship_to_name: Sequelize.STRING,
  ship_to_phone_number: Sequelize.STRING,
  options: Sequelize.JSON,
});

const OrderProduct = sequelize.define('order_product', {
  total_price: Sequelize.INTEGER,
});

const ProductMain = sequelize.define('productmain', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  price: Sequelize.INTEGER,
  supplier: Sequelize.STRING,
  stock: Sequelize.INTEGER,
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  specification: Sequelize.STRING,
  image_url: Sequelize.STRING,
});

const DiscountCode = sequelize.define('discount_code', {
  code: Sequelize.STRING,
  discount_amount: Sequelize.INTEGER,
  start_date: Sequelize.DATE,
  end_date: Sequelize.DATE,
});

const OrderDiscount = sequelize.define('order_discount', {
  discount_amount: Sequelize.INTEGER,
});

const CartProduct = sequelize.define('cart_product', {
  purchase_count: Sequelize.INTEGER,
});

Member.hasMany(Cart, { foreignKey: 'member_id' });
Cart.belongsTo(Member, { foreignKey: 'member_id' });

Member.hasMany(OrderLog, { foreignKey: 'member_id' });
OrderLog.belongsTo(Member, { foreignKey: 'member_id' });

OrderLog.hasMany(OrderProduct, { foreignKey: 'order_id' });
OrderProduct.belongsTo(OrderLog, { foreignKey: 'order_id' });

ProductMain.hasMany(OrderProduct, { foreignKey: 'product_id' });
OrderProduct.belongsTo(ProductMain, { foreignKey: 'product_id' });

OrderLog.hasMany(OrderDiscount, { foreignKey: 'order_id' });
OrderDiscount.belongsTo(OrderLog, { foreignKey: 'order_id' });

DiscountCode.hasMany(OrderDiscount, { foreignKey: 'code_id' });
OrderDiscount.belongsTo(DiscountCode, { foreignKey: 'code_id' });

Cart.hasMany(CartProduct, { foreignKey: 'cart_id' });
CartProduct.belongsTo(Cart, { foreignKey: 'cart_id' });

ProductMain.hasMany(CartProduct, { foreignKey: 'product_id' });
CartProduct.belongsTo(ProductMain, { foreignKey: 'product_id' });

module.exports = {
  Member,
  Cart,
  OrderLog,
  OrderProduct,
  ProductMain,
  DiscountCode,
  OrderDiscount,
  CartProduct,
};