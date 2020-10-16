module.exports = class CarService {
  constructor(CarRepository) {
    this.CarRepository = CarRepository;
  }

  save(car) {
    this.CarRepository.create(car);
  }
};
