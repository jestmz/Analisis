const { fromDataToEntity } = require('../mapper/clientMapper');

module.exports = class ClientController {
  /**
   * @param  {import("../service/ClientService")} ClientService
   */
  constructor(ClientService) {
    this.ClientService = ClientService;
  }
  /**
   * @param  {import("express").Application} app
   */
  configureRoutes(app) {
    const ROUTE = '/client';

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
    const clients = await this.ClientService.getAll();
    const { messages, errors } = req.session;
    res.render('client/views/index.html', { data: { clients }, messages, errors });

    req.session.messages = [];
    req.session.errors = [];
  }
  /**
   * @param  {import("express").Request} req
   * @param  {import("express").Response} res
   */
  create(req, res) {
    res.render('client/views/form.html');
  }

  /**
   * @param  {import("express").Request} req
   * @param  {import("express").Response} res
   */
  async save(req, res) {
    try {
      const clientData = fromDataToEntity(req.body);
      const client = await this.ClientService.save(clientData);
      if (!clientData.id) {
        req.session.messages = [`Client with Id ${client.id} has been created`];
      }
      res.redirect('/client');
    } catch (e) {
      req.session.errors = [e.message, e.stack];
      res.redirect('/client');
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const client = await this.ClientService.getById(id);
      this.ClientService.delete(client);
      req.session.messages = [`Client with Id ${id} has been deleted`];
    } catch (e) {
      req.session.errors = [e.message, e.stack];
    }
    res.redirect('/client');
  }

  async edit(req, res) {
    try {
      const { id } = req.params;
      const client = await this.ClientService.getById(id);
      req.session.messages = [`Client with Id ${client.id} has been updated`];

      res.render('client/views/form.html', { data: { client } });
    } catch (e) {
      req.session.errors = [e.message, e.stack];
      res.redirect('/client');
    }
  }
};
