const RentService = require('../rentService');
const Rent = require('../../entity/rentEntity');

const repositoryMock = {
  update: jest.fn(),
  create: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
  delete: jest.fn(),
};

const Service = new RentService(repositoryMock);

test('Save calls update if rent has an ID already', async () => {
  const rentMock = { id: 1 };
  Service.save(rentMock);

  expect(repositoryMock.update).toHaveBeenCalledTimes(1);
  expect(repositoryMock.update).toHaveBeenCalledWith(rentMock);
});

test('Save calls create if rent has not an ID ', async () => {
  const rentMock = { id: null };
  Service.save(rentMock);

  expect(repositoryMock.create).toHaveBeenCalledTimes(1);
  expect(repositoryMock.create).toHaveBeenCalledWith(rentMock);
});

test('Get all calls Repository', async () => {
  Service.getAll();

  expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
});

test('GetById method calls Repository ', async () => {
  const idMock = 1;
  Service.getById(idMock);

  expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
  expect(repositoryMock.getById).toHaveBeenCalledWith(idMock);
});

test('Delete calls Repository ', async () => {
  const rentMock = {};
  Service.delete(rentMock);

  expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
  expect(repositoryMock.delete).toHaveBeenCalledWith(rentMock);
});
