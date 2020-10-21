module.exports = class ClientService {
  /**
   * @param  {import("../repository/clientRepository")} clientRepository
   */
  constructor(clientRepository) {
    this.clientRepository = clientRepository;
  }

  async save(client) {
    if (client.id) {
      return this.clientRepository.update(client);
    } else {
      return this.clientRepository.create(client);
    }
  }

  async getAll() {
    return this.clientRepository.getAll();
  }

  async getById(id) {
    return this.clientRepository.getById(id);
  }

  async delete(client) {
    return this.clientRepository.delete(client);
  }
};
