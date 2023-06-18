import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class cart extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    cart_id: {
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
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    cart_no: {
      type: DataTypes.UUID,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cart',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cart_pkey",
        unique: true,
        fields: [
          { name: "cart_id" },
        ]
      },
    ]
  });
  }
}
