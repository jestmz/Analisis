const express = require('express');
const app = express();
const nunjucks = require('nunjucks');

nunjucks.configure('src/module/', {
  autoescape: true,
  express: app,
});

const PORT = process.env.PORT || 8080;
app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('car/views/index.html');
});

app.listen(PORT, () => {
  console.log('Listening on ' + PORT);
});
