const CarController = require('./controller/carController');
const CarService = require('./service/carService');
const CarRepository = require('./repository/carRepository');

function initCarModule(container, app) {
  const controller = container.get('CarController');
  controller.configureRoutes(app);
}

module.exports = {
  initCarModule,
  CarController,
  CarService,
  CarRepository,
};
