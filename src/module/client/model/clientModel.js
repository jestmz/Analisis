const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = class ClientModel extends Model {
  /**
   * @param  {import("sequelize").Sequelize} sequelizeInstance
   */
  static setup(sequelizeInstance) {
    ClientModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        lastName: {
          type: DataTypes.STRING,
        },
        DNI: {
          type: DataTypes.STRING,
        },
        nacionality: {
          type: DataTypes.STRING,
        },
        address: {
          type: DataTypes.STRING,
        },
        phone: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        birth: {
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
        modelName: 'Client',
        timestamps: false,
      }
    );

    return ClientModel;
  }
};
