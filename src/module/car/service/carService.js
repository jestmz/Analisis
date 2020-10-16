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
};
