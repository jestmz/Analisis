module.exports = class CarController {
  constructor(CarController) {
    this.CarController = CarController;
  }

  configureRoutes(app) {

    app.get("/", this.index.bind(this))
    app.get("/car/create", this.create.bind(this))
    // post form
    //  maybe 404?
    // view
    // delete
  }

  index(req, res) {
    res.render('car/views/index.html');
  }

  create(req, res) {
    res.render("car/views/form.html")
  }
};
