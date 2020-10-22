const Rent = require('../entity/rentEntity');

function fromDataToEntity({
  id,
  car,
  client,
  pricePerDay,
  startingDate,
  finishingDate,
  totalPrice,
  paymentMethod,
  isPaid,
}) {
  return new Rent({
    id,
    car,
    client,
    pricePerDay,
    startingDate,
    finishingDate,
    totalPrice,
    paymentMethod,
    isPaid,
  });
}

function fromModelToEntity(model) {
  return new Rent(model.toJSON());
}

module.exports = { fromDataToEntity, fromModelToEntity };
