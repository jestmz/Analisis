const Car = require('../entity/carEntity');

function fromDataToEntity({ id, brand, model, year, kms, color, airConditioning, passengers }) {
  return new Car({ id, brand, model, year, kms, color, airConditioning, passengers });
}

function fromModelToEntity(model) {
  return new Car(model.toJSON());
}
module.exports = { fromDataToEntity, fromModelToEntity };
