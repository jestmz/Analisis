const CarService = require('../carService');
const Car = require('../../utilities/entity/carEntity');

const repositoryMock = {
  update: jest.fn(),
  create: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
  delete: jest.fn(),
};

const Service = new CarService(repositoryMock);

test('Get All teams calls from repository once ', () => {
  Service.getAll();

  expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
});

test('If car has an Id at saving, calls update method of the repository ', () => {
  const FAKE_CAR = new Car({ id: 1 });
  Service.save(FAKE_CAR);

  expect(repositoryMock.update).toHaveBeenCalledTimes(1);
  expect(repositoryMock.update).toHaveBeenCalledWith(FAKE_CAR);
});

test('If car has not an id, then calls create method of the repository ', () => {
  const FAKE_CAR = new Car();
  Service.save(FAKE_CAR);

  expect(FAKE_CAR.id).toBeUndefined();
  expect(repositoryMock.create).toHaveBeenCalledTimes(1);
  expect(repositoryMock.create).toHaveBeenCalledWith(FAKE_CAR);
});

test('Get by Id calls repository method once', () => {
  const id = 1;
  Service.getById(id);

  expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
  expect(repositoryMock.getById).toHaveBeenCalledWith(id);
});

test('Deletes calls repository method once', () => {
  const FAKE_CAR = new Car();

  Service.delete(FAKE_CAR);
  expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
  expect(repositoryMock.delete).toHaveBeenCalledWith(FAKE_CAR);
});
