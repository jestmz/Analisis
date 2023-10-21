const express = require('express');
const app = express();
const nunjucks = require('nunjucks');

const { initCarModule } = require('./module/car/module');
const { initClientModule } = require('./module/client/module');
const { initRentModule } = require('./module/rent/module');
const configureDependencyInversion = require('./config/di');
const container = configureDependencyInversion();

nunjucks.configure('src/module/', {
  autoescape: true,
  express: app,
});

const PORT = process.env.PORT || 7777 ;
app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }));

const mainDb = container.get('Sequelize');

mainDb.sync();

const session = container.get('Session');
app.use(session);
initCarModule(container, app);
initClientModule(container, app);
initRentModule(container, app);

/**
 * @type  {import("./module/car/controller/carController")} CarController
 */
const CarController = container.get('CarController');
app.get('/', CarController.index.bind(CarController));

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:` + PORT + `/`);
});
