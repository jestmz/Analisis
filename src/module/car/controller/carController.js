const fromDataToEntity = require("../utilities/mapper/carMapper")

module.exports = class CarController {
  constructor(ClubService) {
    this.ClubService = ClubService;
  }

  configureRoutes(app) {
    app.get("/", this.index.bind(this))
    app.get("/car/create", this.create.bind(this))
    app.post("/car/save", this.save.bind(this))
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

  save(req, res) {
    const car = fromDataToEntity(req.body)
    this.ClubService.save(car)
  }
};
