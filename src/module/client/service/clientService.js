module.exports = class ClientService {
  /**
   * @param  {import("../repository/clientRepository")} clientRepository
   */
  constructor(clientRepository) {
    this.clientRepository = clientRepository;
  }

  async save(client) {
    if (client.id) {
      return await this.clientRepository.update(client);
    } else {
      return await this.clientRepository.create(client);
    }
  }

  async getAll() {
    return await this.clientRepository.getAll();
  }

  async getById(id) {
    return await this.clientRepository.getById(id);
  }

  async delete(client) {
    return await this.clientRepository.delete(client);
  }
};
