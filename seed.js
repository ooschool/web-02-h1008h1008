const Sequelize = require('sequelize');
const sequelize = new Sequelize('web02', 'root', 'Goodgood1008', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql'
});

// 导入您的模型定义
const { Member, Cart, OrderLog, OrderProduct, ProductMain, DiscountCode, OrderDiscount, CartProduct } = require('./models');

// 使用 sync 方法创建表格

Member.create({
  id: '1',
  email: 'jone@example.com',
  name: 'Jone Smith',
  address: '456 Elm St',
  phone_number: '987-654-3210',
  account: 'jane_smith',
  passhash: 'hashed_password2',
  options: { key2: 'value2' },
});

// 向 Member 表插入种子数据
Member.create({
  id: '2',
  email: 'jae@example.com',
  name: 'Ja Smith',
  address: '456 Elm St',
  phone_number: '987-654-3210',
  account: 'jane_smith',
  passhash: 'hashed_password2',
  options: { key2: 'value2' },
});

// 向 ProductMain 表插入种子数据
// for (let i = 1; i <= 20; i++) {
//   ProductMain.create({
//     id: `${i}`,
//     price: 29.99 + i, // 每个产品的价格递增
//     supplier: `Supplier ${i}`,
//     stock: 100 - i, // 每个产品的库存递减
//     name: `Product ${i}`,
//     description: `Description for Product ${i}`,
//     descriptionshort: `shortDescription for Product ${i}`,
//     specification: `Specification for Product ${i}`,
//     image_url: `https://via.placeholder.com/159x200?text=Product${i}`,
//   });
// }

// 添加更多的会员和产品种子数据

