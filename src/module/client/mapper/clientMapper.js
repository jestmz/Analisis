const Client = require('../entity/clientEntity');

function fromDataToEntity({ id, name, lastName, DNI, address, phone, email, birth }) {
  return new Client({ id, name, lastName, DNI, address, phone, email, birth });
}

function fromModelToEntity(model) {
  return new Client(model.toJSON());
}

module.exports = { fromDataToEntity, fromModelToEntity };
