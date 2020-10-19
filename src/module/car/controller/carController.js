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
  async index(req, res) {
    const cars = await this.CarService.getAll();
    const { messages, errors } = req.session;
    res.render('car/views/index.html', { data: { cars }, messages, errors });

    req.session.messages = [];
    req.session.errors = [];
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
  async save(req, res) {
    try {
      const bodyCar = fromDataToEntity(req.body);
      const car = await this.CarService.save(bodyCar);
      if (!bodyCar.id) {
        req.session.messages = [`Car with Id ${car.id} has been created`];
      }
      res.redirect('/');
    } catch (e) {
      req.session.errors = [e.message, e.stack];
      res.redirect('/');
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const car = await this.CarService.getById(id);
      this.CarService.delete(car);
      req.session.messages = [`Car with Id ${id} has been deleted`];
    } catch (e) {
      req.session.errors = [e.message, e.stack];
    }
    res.redirect('/car');
  }

  async edit(req, res) {
    try {
      const { id } = req.params;
      const car = await this.CarService.getById(id);
      req.session.messages = [`Car with Id ${car.id} has been updated`];

      res.render('car/views/form.html', { data: { car } });
    } catch (e) {
      req.session.errors = [e.message, e.stack];
      res.redirect('/');
    }
  }
};
