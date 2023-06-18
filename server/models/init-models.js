import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _cart from  "./cart.js";
import _category from  "./category.js";
import _item_product from  "./item_product.js";
import _order_line_item from  "./order_line_item.js";
import _orders from  "./orders.js";
import _product from  "./product.js";
import _users from  "./users.js";
import Sequelize from "sequelize";
import config from "../config/config.js";

const sequelize = new Sequelize(
  config.db_name,
  config.db_username,
  config.db_password,
  {
    dialect: 'postgres',
    pool: {
      max: 5, 
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: { 
      timestamps: false,
    }
  }
);

const initModels = (sequelize) => {
  const cart = _cart.init(sequelize, DataTypes);
  const category = _category.init(sequelize, DataTypes);
  const item_product = _item_product.init(sequelize, DataTypes);
  const order_line_item = _order_line_item.init(sequelize, DataTypes);
  const orders = _orders.init(sequelize, DataTypes);
  const product = _product.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  product.belongsTo(category, { as: "cate", foreignKey: "cate_id"});
  category.hasMany(product, { as: "products", foreignKey: "cate_id"});
  order_line_item.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(order_line_item, { as: "order_line_items", foreignKey: "order_id"});
  cart.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(cart, { as: "carts", foreignKey: "product_id"});
  item_product.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(item_product, { as: "item_products", foreignKey: "product_id"});
  order_line_item.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(order_line_item, { as: "order_line_items", foreignKey: "product_id"});
  cart.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(cart, { as: "carts", foreignKey: "user_id"});
  item_product.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(item_product, { as: "item_products", foreignKey: "user_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});

  return {
    cart,
    category,
    item_product,
    order_line_item,
    orders,
    product,
    users,
  };
}

const models = initModels(sequelize);
export default models;
export { sequelize };