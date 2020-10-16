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
    const ROUTE = '/car';

    app.get(`${ROUTE}`, this.index.bind(this));
    app.get(`${ROUTE}/create`, this.create.bind(this));
    app.post(`${ROUTE}/save`, this.save.bind(this));
    app.get(`${ROUTE}/edit/:id`, this.edit.bind(this));
    app.get(`${ROUTE}/delete/:id`, this.delete.bind(this));
  }
  /**
   * @param  {import("express").Request} req
   * @param  {import("express").Response} res
   */
  index(req, res) {
    const cars = this.CarService.getAll();
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

  delete(req, res) {
    const { id } = req.params;
    const car = this.CarService.getById(id);
    this.CarService.delete(car);
    res.redirect('/car');
  }

  edit(req, res) {
    const { id } = req.params;
    const car = this.CarService.getById(id);
    console.log(car);
    res.render('car/views/form.html', { data: { car } });
  }
};
