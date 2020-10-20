const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = class CarModel extends Model {
  /**
   * @param  {import("sequelize").Sequelize} sequelizeInstance
   */
  static setup(sequelizeInstance) {
    CarModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        brand: {
          type: DataTypes.STRING,
        },
        model: {
          type: DataTypes.STRING,
        },
        year: {
          type: DataTypes.STRING,
        },
        kms: {
          type: DataTypes.STRING,
        },
        color: {
          type: DataTypes.STRING,
        },
        airConditioning: {
          type: DataTypes.STRING,
        },
        passengers: {
          type: DataTypes.STRING,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Car',
        timestamps: false,
      }
    );

    return CarModel;
  }
};
