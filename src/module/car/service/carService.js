module.exports = class CarService {
  /**
   * @param  {import("../repository/carRepository")} CarRepository
   */
  constructor(CarRepository) {
    this.CarRepository = CarRepository;
  }

  async save(car) {
    if (car.id) {
      return this.CarRepository.update(car);
    } else {
      return this.CarRepository.create(car);
    }
  }

  async getAll() {
    return this.CarRepository.getAll();
  }

  async getById(id) {
    return this.CarRepository.getById(id);
  }

  async delete(car) {
    return this.CarRepository.delete(car);
  }
};
