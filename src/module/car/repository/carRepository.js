module.exports = class CarRepository {
  constructor(databaseAdapter) {
    this.databaseAdapter = databaseAdapter;
  }
  create(car) {
    console.log(car);
  }
};
