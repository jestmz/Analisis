const CarController = require('./controller/carController');
const CarService = require('./service/carService');
const CarRepository = require('./repository/carRepository');
const CarModel = require('./model/carModel');

/**
 * @param  {import("rsdi").IDIContainer} container
 * @param  {import("express").Application} app
 */
function initCarModule(container, app) {
  /**
   * @type {import("./controller/carController")} 'CarController'
   */
  const controller = container.get('CarController');
  controller.configureRoutes(app);
}

module.exports = {
  initCarModule,
  CarController,
  CarService,
  CarRepository,
  CarModel,
};
