const ClientController = require('./controller/clientController');
const ClientService = require('./service/clientService');
const ClientRepository = require('./repository/clientRepository');
const ClientModel = require('./model/clientModel');

/**
 * @param  {import("rsdi").IDIContainer} container
 * @param  {import("express").Application} app
 */
function initClientModule(container, app) {
  /**
   * @type {import("./controller/clientController")} 'ClientController'
   */
  const controller = container.get('ClientController');
  controller.configureRoutes(app);
}

module.exports = {
  initClientModule,
  ClientController,
  ClientService,
  ClientRepository,
  ClientModel,
};
