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
  async update(car) {
    let carModel = await this.carModel.findOne({ where: { id: car.id } });
    carModel = this.carModel.build(car, { isNewRecord: false });
    carModel = await carModel.save();

    return fromModelToEntity(carModel);
  }

  async getById(id) {
    const carModel = await this.carModel.findOne({ where: { id } });
    return fromModelToEntity(carModel);
  }

  async delete(car) {
    console.log(car);
    return Boolean(await this.carModel.destroy({ where: { id: car.id } }));
  }
  async getAll() {
    const cars = await this.carModel.findAll();
    return cars.map(fromModelToEntity);
  }
};
