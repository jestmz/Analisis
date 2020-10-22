const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = class RentModel extends Model {
  /**
   * @param  {import("sequelize").Sequelize} sequelizeInstance
   */
  static setup(sequelizeInstance) {
    RentModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        car: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        client: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        pricePerDay: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        startingDate: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        finishingDate: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        totalPrice: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        paymentMethod: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isPaid: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
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
        modelName: 'Rent',
        timestamps: false,
      }
    );

    return RentModel;
  }

  static setupAssociations(CarModel, ClientModel) {
    RentModel.belongsTo(CarModel, { foreignKey: 'car_id' });
    RentModel.belongsTo(ClientModel, { foreignKey: 'client_id' });
  }
};
