const CarRepository = require('../carRepository');
const Sqlite3 = require('better-sqlite3');
const Car = require('../../utilities/entity/carEntity');
const fs = require('fs');

let mockDb;

beforeEach(() => {
  mockDb = new Sqlite3(':memory:');
  const migration = fs.readFileSync('./src/config/setup.sql', 'utf-8');
  mockDb.exec(migration);
});

test('Create generates and id correctly ', () => {
  const Repository = new CarRepository(mockDb);

  const FAKE_CAR = {
    brand: 'brand',
    model: 'model',
    year: 'year',
    kms: 'kms',
    color: 'color',
    airConditioning: 'yep',
    passengers: '1',
  };

  const car = Repository.create(FAKE_CAR);
  expect(car.id).toBe(1);
});

test('Delete works when called', () => {
  const Repository = new CarRepository(mockDb);

  const FAKE_CAR = {
    brand: 'brand',
    model: 'model',
    year: 'year',
    kms: 'kms',
    color: 'color',
    airConditioning: 'yep',
    passengers: '1',
  };

  const car = Repository.create(FAKE_CAR);
  expect(car.id).toEqual(1);
  expect(Repository.getById(1)).toBeDefined();
  Repository.delete(car);
  expect(Repository.getById(1)).toBeUndefined();
});

test('Get All returns an array with entities', () => {
  const Repository = new CarRepository(mockDb);
  expect(Repository.getAll()).toEqual([]);
  const FAKE_CAR = Repository.create(
    new Car({
      id: 1,
      brand: 'brand',
      model: 'model',
      year: 'year',
      kms: 'kms',
      color: 'color',
      airConditioning: 'yep',
      passengers: '1',
    })
  );
});
