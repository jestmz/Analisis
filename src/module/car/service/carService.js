module.exports = class CarService {
  /**
   * @param  {import("../repository/carRepository")} CarRepository
   */
  constructor(CarRepository) {
    this.CarRepository = CarRepository;
  }

  save(car) {
    return this.CarRepository.create(car);
  }

  getAll() {
    return this.CarRepository.getAll();
  }

  getById(id) {
    return this.CarRepository.getById(id);
  }

  delete(car) {
    return this.CarRepository.delete(car);
  }
};
