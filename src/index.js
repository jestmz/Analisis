const express = require('express');
const app = express();
const nunjucks = require('nunjucks');

const { initCarModule } = require("./module/car/module")
const configureDependencyInversion = require("./config/di")
const container = configureDependencyInversion()

nunjucks.configure('src/module/', {
  autoescape: true,
  express: app,
});

const PORT = process.env.PORT || 8080;
app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }));

initCarModule(container, app)




app.listen(PORT, () => {
  console.log('Listening on ' + PORT);
});
