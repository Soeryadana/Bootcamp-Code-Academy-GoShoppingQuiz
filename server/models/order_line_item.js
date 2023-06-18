import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class order_line_item extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    order_line_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'product',
        key: 'product_id'
      }
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    subtotal: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'orders',
        key: 'order_id'
      }
    }
  }, {
    sequelize,
    tableName: 'order_line_item',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "order_line_item_pkey",
        unique: true,
        fields: [
          { name: "order_line_id" },
        ]
      },
    ]
  });
  }
}
