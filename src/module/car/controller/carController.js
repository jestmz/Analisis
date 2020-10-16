module.exports = class CarController {
  constructor(CarController) {
    this.CarController = CarController;
  }

  configureRoutes(app) {

    app.get("/", this.index.bind(this))
    // get form
    // post form
    //  maybe 404?
    // view
    // delete
  }

  index(req, res) {
    res.render('car/views/index.html');
  }

};
