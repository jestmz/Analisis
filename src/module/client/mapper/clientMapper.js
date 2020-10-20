const Client = require('../entity/clientEntity');

function fromDataToEntity({ id, name, lastName, DNI, address, phone, email, birthday }) {
  return new Client({ id, name, lastName, DNI, address, phone, email, birthday });
}

function fromModelToEntity(model) {
  return new Client(model.toJSON());
}

module.exports = { fromDataToEntity, fromModelToEntity };
