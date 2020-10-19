const { fromModelToEntity } = require('../utilities/mapper/carMapper');

module.exports = class CarRepository {
  /**
   * @param  {import("../model/carModel} carModel
   */
  constructor(carModel) {
    this.carModel = carModel;
  }

  /**
   * @param  {import("../utilities/entity/carEntity")} car
   */
  async create(car) {
    let carModel;
    carModel = this.carModel.build(car);
    carModel = await carModel.save();

    return fromModelToEntity(carModel);
  }
  /**
   * @param  {import("../utilities/entity/carEntity")} car
   */
  update(car) {}

  getById(id) {}

  async delete(car) {
    return Boolean(
      await this.carModel.destroy({
        where: {
          id: car.id,
        },
      })
    );
  }

  async getAll() {}
};
