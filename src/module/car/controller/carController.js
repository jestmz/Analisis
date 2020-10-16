const fromDataToEntity = require('../utilities/mapper/carMapper');

module.exports = class CarController {
  /**
   * @param  {import("../service/carService")} CarService
   */
  constructor(CarService) {
    this.CarService = CarService;
  }
  /**
   * @param  {import("express").Application} app
   */
  configureRoutes(app) {
    app.get('/', this.index.bind(this));
    app.get('/car/create', this.create.bind(this));
    app.post('/car/save', this.save.bind(this));
    // post form
    //  maybe 404?
    // view
    // delete
  }
  /**
   * @param  {import("express").Request} req
   * @param  {import("express").Response} res
   */
  index(req, res) {
    res.render('car/views/index.html');
  }
  /**
   * @param  {import("express").Request} req
   * @param  {import("express").Response} res
   */
  create(req, res) {
    res.render('car/views/form.html');
  }

  /**
   * @param  {import("express").Request} req
   * @param  {import("express").Response} res
   */
  save(req, res) {
    const car = fromDataToEntity(req.body);
    this.CarService.save(car);
  }
};
