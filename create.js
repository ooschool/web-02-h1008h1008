const Sequelize = require('sequelize');

// 创建 Sequelize 实例并连接到数据库
const sequelize = new Sequelize('web02', 'root', 'Goodgood1008', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql'
});

// 定义 member 模型

const Member = sequelize.define('member', {
  id: {
    type: Sequelize.INTEGER, // 修改类型为整数
    primaryKey: true,
    autoIncrement: true, // 添加此行以使 ID 自动增加
  },
  email: Sequelize.STRING,
  name: Sequelize.STRING,
  address: Sequelize.STRING,
  phone_number: Sequelize.STRING,
  account: Sequelize.STRING,
  passhash: Sequelize.STRING,
  options: Sequelize.JSON,
  resetPasswordToken: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  resetPasswordExpires: {
    type: Sequelize.DATE,
    allowNull: true,
  },
}, {
  tableName: 'member', // 添加此行来指定正确的表名
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

const ProductMain = sequelize.define('product_main', {
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

// 定义外键关系
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
sequelize.sync()
  .then(() => {
    console.log('Tables created successfully.');
  })
  .catch((error) => {
    console.error('Error creating tables:', error);
  });