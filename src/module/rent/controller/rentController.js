const { fromDataToEntity } = require('../mapper/rentMapper');

module.exports = class RentController {
  /**
   * @param  {import("../service/rentService")} rentService
   * @param  {import("../../car/service/carService")} CarService
   * @param  {import("../../client/service/clientService")} ClientService
   */
  constructor(rentService, CarService, ClientService) {
    this.rentService = rentService;
    this.CarService = CarService;
    this.ClientService = ClientService;
  }
  /**
   * @param  {import("express").Application} app
   */
  configureRoutes(app) {
    const ROUTE = '/rent';

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
    const rentList = await this.rentService.getAll();
    const { messages, errors } = req.session;
    res.render('rent/views/index.html', { data: { rentList }, messages, errors });

    req.session.messages = [];
    req.session.errors = [];
  }
  /**
   * @param  {import("express").Request} req
   * @param  {import("express").Response} res
   */
  async create(req, res) {
    const cars = await this.CarService.getAll();
    const clients = await this.ClientService.getAll();

    if (cars.length > 0 && clients.length > 0) {
      res.render('rent/views/form.html', { data: { cars, clients } });
    } else {
      req.session.errors = ['Must Create a Car and a Client Before'];
      res.redirect('/rent');
    }
  }

  /**
   * @param  {import("express").Request} req
   * @param  {import("express").Response} res
   */
  async save(req, res) {
    try {
      const rentData = fromDataToEntity(req.body);
      const rent = await this.rentService.save(rentData);
      if (!rentData.id) {
        req.session.messages = [`rent with Id ${rent.id} has been created`];
      }
      res.redirect('/rent');
    } catch (e) {
      req.session.errors = [e.message, e.stack];
      res.redirect('/rent');
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const rent = await this.rentService.getById(id);
      await this.rentService.delete(rent);
      req.session.messages = [`Rent with Id ${id} has been deleted`];
    } catch (e) {
      req.session.errors = [e.message, e.stack];
    }
    res.redirect('/rent');
  }

  async edit(req, res) {
    try {
      const { id } = req.params;
      const rent = await this.rentService.getById(id);
      const car = await this.CarService.getById(rent.CarId);
      const client = await this.ClientService.getById(rent.ClientId);
      res.render('rent/views/form.html', { data: { rent, car, client } });
      req.session.messages = [`Rent with Id ${rent.id} has been updated`];
    } catch (e) {
      req.session.errors = [e.message, e.stack];
      res.redirect('/rent');
    }
  }
};
