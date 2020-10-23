const CarRepository = require('../carRepository');
const sequelize = require('sequelize');
const Car = require('../../utilities/entity/carEntity');
const carModel = require('../../model/carModel');
const sequelizeInstance = new sequelize('sqlite::memory');

let Repository;
const FAKE_CAR = new Car({
  brand: 'brand',
  model: 'model',
  year: 'year',
  kms: 'kms',
  color: 'color',
  airConditioning: 'yes',
  passengers: '1',
});

beforeAll(() => {
  const car = carModel.setup(sequelizeInstance);
  Repository = new CarRepository(car);
});

beforeEach(async (done) => {
  await sequelizeInstance.sync({ force: true });
  done();
});

test('Creates a car and adds an ID', async () => {
  const newCar = await Repository.create(FAKE_CAR);
  expect(newCar.id).toEqual(1);
});

test('Updates a Car if entity has already an ID', async () => {
  const newCar = await Repository.create(FAKE_CAR);
  expect(newCar.id).toEqual(1);

  newCar.model = 'FAKE_MODEL';
  const modifiedCar = await Repository.update(newCar);
  expect(modifiedCar.id).toEqual(1);
  expect(modifiedCar.model).toEqual('FAKE_MODEL');
});

test('Deletes correctly a car ', async () => {
  const newCar = await Repository.create(FAKE_CAR);
  expect(newCar.id).toEqual(1);

  await Repository.delete(newCar);
  expect(Repository.getById(newCar.id)).rejects.toThrow(Error);
});
