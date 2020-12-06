const ClientService = require('../clientService');
const Client = require('../../entity/clientEntity');

const RepositoryMock = {
  save: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

const Service = new ClientService(RepositoryMock);

test('Get All teams calls Repository ', () => {
  Service.getAll();
  expect(RepositoryMock.getAll).toHaveBeenCalledTimes(1);
});

test('Save calls Update method if Client has an Id ', () => {
  const clientMock = new Client({ id: 1 });
  Service.save(clientMock);

  expect(RepositoryMock.update).toHaveBeenCalledWith(clientMock);
  expect(RepositoryMock.update).toHaveBeenCalledTimes(1);
});
/*
test('Save calls Create method if client has not an ID', () => {
  const clientMock = new Client({ id: NaN });
  Service.save(clientMock);

  expect(clientMock.id).toBeNaN();
  expect(RepositoryMock.create).toHaveBeenCalledTimes(1);
  expect(RepositoryMock.create).toHaveBeenCalledWith(clientMock);
});
*/
test('Delete calls delete method of the repository', () => {
  const clientMock = new Client({ id: 1 });
  Service.delete(clientMock);

  expect(RepositoryMock.delete).toHaveBeenCalledTimes(1);
  expect(RepositoryMock.delete).toHaveBeenCalledWith(clientMock);
});

test('getById calls Repository method', () => {
  const id = 1;
  Service.getById(id);

  expect(RepositoryMock.getById).toHaveBeenCalledTimes(1);
  expect(RepositoryMock.getById).toHaveBeenCalledWith(id);
});
