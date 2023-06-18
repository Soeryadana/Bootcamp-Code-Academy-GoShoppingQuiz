import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class product extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    product_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    cate_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'category',
        key: 'cate_id'
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'product',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "product_pkey",
        unique: true,
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
  }
}
