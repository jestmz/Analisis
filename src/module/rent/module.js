const RentController = require('./controller/rentController');
const RentService = require('./service/rentService');
const RentRepository = require('./repository/rentRepository');
const RentModel = require('./model/rentModel');

/**
 * @param  {import("rsdi").IDIContainer} container
 * @param  {import("express").Application} app
 */
function initRentModule(container, app) {
  /**
   * @type {import("./controller/RentController")} 'RentController'
   */
  const controller = container.get('RentController');
  controller.configureRoutes(app);
}

module.exports = {
  initRentModule,
  RentController,
  RentService,
  RentRepository,
  RentModel,
};
