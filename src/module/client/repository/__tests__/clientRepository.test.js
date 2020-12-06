const ClientRepository = require('../clientRepository');
const sequelize = require('sequelize');
const Client = require('../../entity/clientEntity');
const clientModel = require('../../model/clientModel');
const sequelizeInstance = new sequelize('sqlite::memory');

let Repository;
const FAKE_CLIENT = new Client({
  name: 'name',
  lastName: 'lastName',
  DNI: 'DNI',
  address: 'address',
  phone: 'phone',
  email: 'email',
  birth: 'birth',
});

beforeAll(() => {
  const client = clientModel.setup(sequelizeInstance);
  Repository = new ClientRepository(clientModel);
});

beforeEach(async (done) => {
  await sequelizeInstance.sync({ force: true });
  done();
});

test('Creates a client and adds an ID', async () => {
  const newClient = await Repository.create(FAKE_CLIENT);
  expect(newClient.id).toEqual(1);
});

test('Updates a client if has an ID', async () => {
  const newClient = await Repository.create(FAKE_CLIENT);
  expect(newClient.id).toEqual(1);

  newClient.name = 'newName';

  const updateClient = await Repository.update(newClient);
  expect(updateClient.name).toEqual('newName');
  expect(updateClient.id).toEqual(1);
});

test('Delete method deletes correctly a client', async () => {
  const newClient = await Repository.create(FAKE_CLIENT);
  expect(newClient.id).toEqual(1);

  await Repository.delete(newClient);
  expect(Repository.getById(newClient.id)).rejects.toThrow(Error);
});
