const { fromDataToEntity } = require('../utilities/mapper/carMapper');

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
    //  maybe 404?
    // view
    // delete
  }
  /**
   * @param  {import("express").Request} req
   * @param  {import("express").Response} res
   */
  index(req, res) {
    const cars = this.CarService.getAll();
    console.log(cars);
    res.render('car/views/index.html', { data: { cars } });
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
    const data = fromDataToEntity(req.body);
    const car = this.CarService.save(data);
    res.redirect('/');
  }
};
