const express = require('express');
const app = express();
const nunjucks = require('nunjucks');

const { initCarModule } = require('./module/car/module');
const configureDependencyInversion = require('./config/di');
const container = configureDependencyInversion();

nunjucks.configure('src/module/', {
  autoescape: true,
  express: app,
});

const PORT = process.env.PORT || 8080;
app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }));

const session = container.get('Session');
app.use(session);
initCarModule(container, app);

/**
 * @type  {import("./module/car/controller/carController")} CarController
 */
const CarController = container.get('CarController');
app.get('/', CarController.index.bind(CarController));

app.listen(PORT, () => {
  console.log('Listening on ' + PORT);
});
