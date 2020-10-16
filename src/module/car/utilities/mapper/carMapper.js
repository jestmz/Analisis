const Car = require('../entity/carEntity');

module.exports = { fromDataToEntity, fromDatabaseToEntity };

function fromDataToEntity({ id, brand, model, year, kms, color, air_conditioning, passengers }) {
  return new Car(id, brand, model, year, kms, color, air_conditioning, passengers);
}

function fromDatabaseToEntity({
  id,
  brand,
  model,
  year,
  kms,
  color,
  air_conditioning: airConditioning,
  passengers,
}) {
  return new Car(id, brand, model, year, kms, color, airConditioning, passengers);
}
