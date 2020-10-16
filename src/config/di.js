const { default: DIContainer, factory, object, get } = require('rsdi');
const { CarController, CarService, CarRepository } = require('../module/car/module');
const Sqlite3 = require('better-sqlite3');

function configureDatabaseAdapter() {
  return new Sqlite3('./data/database.db');
}

function addCommonDefinitions(container) {
  container.addDefinitions({
    DatabaseAdapter: factory(configureDatabaseAdapter),
  });
}

function addCarModuleDefinitions(container) {
  container.addDefinitions({
    CarController: object(CarController).construct(get('CarService')),
    CarService: object(CarService).construct(get('CarRepository')),
    CarRepository: object(CarRepository).construct(get('DatabaseAdapter')),
  });
}

function configureDI() {
  const container = new DIContainer();
  addCarModuleDefinitions(container);
  addCommonDefinitions(container);
  return container;
}

module.exports = configureDI;
