const { fromModelToEntity } = require('../mapper/clientMapper');

module.exports = class ClientRepository {
  /**
   * @param  {import("../model/clientModel} clientModel
   */
  constructor(clientModel) {
    this.clientModel = clientModel;
  }

  async create(client) {
    const clientInstance = await this.clientModel.create(client);
    return fromModelToEntity(clientInstance);
  }

  async update(client) {
    const clientInstance = await this.clientModel.build(client, { isNewRecord: false });
    await clientInstance.save();
    return fromModelToEntity(clientInstance);
  }

  async getById(id) {
    const clientModel = await this.clientModel.findOne({ where: { id } });
    return clientModel;
  }

  async delete(client) {
    if (!client) {
      throw Error;
    }
    const clientModel = await this.clientModel.destroy({ where: { id: client.id } });
    return Boolean(clientModel);
  }

  async getAll() {
    const clients = await this.clientModel.findAll();
    return clients.map(fromModelToEntity);
  }
};
