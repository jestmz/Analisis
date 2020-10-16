const { default: DIContainer, factory, object, get } = require('rsdi');
const { CarController, CarService, CarRepository } = require('../module/car/module');
const Sqlite3 = require('better-sqlite3');
const session = require('express-session');

function configureDatabaseAdapter() {
  return new Sqlite3('./data/database.db');
}

function configureSession() {
  const ONE_WEEK_IN_SECONDS = 604800;
  const sessionOptions = {
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: ONE_WEEK_IN_SECONDS },
  };
  return session(sessionOptions);
}

function addCommonDefinitions(container) {
  container.addDefinitions({
    DatabaseAdapter: factory(configureDatabaseAdapter),
    Session: factory(configureSession),
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
