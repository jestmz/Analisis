const ClientController = require('../clientController');
const Client = require('../../entity/clientEntity');

const ServiceMock = {
  save: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  delete: jest.fn(() => Promise.resolve(true)),
  getAll: jest.fn(() => Promise.resolve([])),
};

const Controller = new ClientController(ServiceMock);

test('Configure Client Routes correctly', () => {
  const app = {
    get: jest.fn(),
    post: jest.fn(),
  };
  Controller.configureRoutes(app);
});

test('Create renders form.html  ', async () => {
  const renderMock = jest.fn();

  await Controller.create({}, { render: renderMock });
  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('client/views/form.html');
});

test('Delete calls service and redirects to home  ', async () => {
  const redirectMock = jest.fn();
  const FAKE_CLIENT = new Client({ id: 1 });
  ServiceMock.getById.mockImplementationOnce(() => Promise.resolve(FAKE_CLIENT));

  await Controller.delete(
    { params: { id: 1 }, session: { errors: [], messages: [] } },
    { redirect: redirectMock }
  );

  expect(ServiceMock.delete).toHaveBeenCalledTimes(1);
  expect(ServiceMock.delete).toHaveBeenCalledWith(FAKE_CLIENT);
  expect(redirectMock).toHaveBeenCalledTimes(1);
});

test('Edit calls service and renders form.html', async () => {
  const renderMock = jest.fn();
  const redirectMock = jest.fn();
  const MOCK_ID = 1;

  await ServiceMock.getById.mockImplementationOnce(() => ({}));

  await Controller.edit(
    { params: { id: MOCK_ID }, session: { errors: [], messages: [] } },
    { render: renderMock, redirect: redirectMock }
  );

  expect(ServiceMock.getById).toHaveBeenCalledWith(MOCK_ID);
  expect(ServiceMock.getById).toHaveBeenCalled();
  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('client/views/form.html', { data: { client: {} } });
});

test('Index renders index.html ', async () => {
  const renderMock = jest.fn();
  const clients = await ServiceMock.getAll();

  await Controller.index({ session: { messages: [], errors: [] } }, { render: renderMock });

  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('client/views/index.html', {
    data: { clients },
    errors: [],
    messages: [],
  });
});

test('Save calls service and redirect to /client ', async () => {
  const redirectMock = jest.fn();
  const bodyMock = new Client({
    id: undefined,
    name: undefined,
    lastName: undefined,
    DNI: undefined,
    address: undefined,
    phone: undefined,
    email: undefined,
    birth: undefined,
  });

  await Controller.save({ body: bodyMock, session: {} }, { redirect: redirectMock });

  expect(ServiceMock.save).toHaveBeenCalledTimes(1);
  expect(ServiceMock.save).toHaveBeenCalledWith(bodyMock);
  expect(redirectMock).toHaveBeenCalledWith('/client');
  expect(redirectMock).toHaveBeenCalledTimes(1);
});
