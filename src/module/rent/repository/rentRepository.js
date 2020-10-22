const { fromModelToEntity } = require('../mapper/rentMapper');

module.exports = class rentRepository {
  /**
   * @param  {import("../model/rentModel  } rentModel
   */
  constructor(RentModel) {
    this.RentModel = RentModel;
  }

  async create(rent) {
    const rentInstance = await this.RentModel.create(rent);
    return fromModelToEntity(rentInstance);
  }

  async update(rent) {
    const rentInstance = await this.RentModel.build(rent, { isNewRecord: false });
    await rentInstance.save();

    return fromModelToEntity(rentInstance);
  }

  async getById(id) {
    const RentModel = await this.RentModel.findOne({ where: { id } });
    return fromModelToEntity(RentModel);
  }

  async delete(rent) {
    return Boolean(await this.RentModel.destroy({ where: { id: rent.id } }));
  }

  async getAll() {
    const rentList = await this.RentModel.findAll();
    return rentList.map(fromModelToEntity);
  }
};
