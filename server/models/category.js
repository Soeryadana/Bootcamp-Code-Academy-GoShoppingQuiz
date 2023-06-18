import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class category extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    cate_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    cate_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'category',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "category_pkey",
        unique: true,
        fields: [
          { name: "cate_id" },
        ]
      },
    ]
  });
  }
}
