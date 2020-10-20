module.exports = class ClientService {
  /**
   * @param  {import("../repository/ClientService")} ClientService
   */
  constructor(ClientService) {
    this.ClientService = ClientService;
  }

  async save(client) {
    if (client.id) {
      return this.ClientService.update(client);
    } else {
      return this.ClientService.create(client);
    }
  }

  async getAll() {
    return this.ClientService.getAll();
  }

  async getById(id) {
    return this.ClientService.getById(id);
  }

  async delete(client) {
    return this.ClientService.delete(client);
  }
};
