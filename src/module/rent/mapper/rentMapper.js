const Rent = require('../entity/rentEntity');
const Car = require('../../car/utilities/entity/carEntity');
const Client = require('../../client/entity/clientEntity');

function fromDataToEntity({
  id,
  pricePerDay,
  startingDate,
  finishingDate,
  totalPrice,
  paymentMethod,
  isPaid,
  carId: CarId,
  clientId: ClientId,
}) {
  return new Rent({
    id,
    pricePerDay,
    startingDate,
    finishingDate,
    totalPrice,
    paymentMethod,
    isPaid,
    CarId,
    ClientId,
  });
}

function fromModelToEntity(model) {
  return new Rent(model.toJSON());
}

module.exports = { fromDataToEntity, fromModelToEntity };
