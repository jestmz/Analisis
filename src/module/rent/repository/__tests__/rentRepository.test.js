const RentRepository = require('../rentRepository');
const sequelize = require('sequelize');
const Rent = require('../../entity/rentEntity');
const rentModel = require('../../model/rentModel');
const sequelizeInstance = new sequelize('sqlite::memory');

let Repository;
const FAKE_RENT = new Rent({
  id: 'id',
  pricePerDay: 'pricePerDay',
  startingDate: 'startingDate',
  finishingDate: 'finishingDate',
  totalPrice: 'totalPrice',
  paymentMethod: 'paymentMethod',
  isPaid: 'isPaid',
  CarId: 'CarId',
  ClientId: 'ClientId',
});

beforeAll(() => {
  const rent = rentModel.setup(sequelizeInstance);
  Repository = new RentRepository(rent);
});

beforeEach(async (done) => {
  await sequelizeInstance.sync({ force: true });
  done();
});
