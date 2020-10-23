const CarController = require('../carController');
const Car = require('../../utilities/entity/carEntity');
const { fromDataToEntity } = require('../../utilities/mapper/carMapper');

const ServiceMock = {
  save: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  delete: jest.fn(() => Promise.resolve(true)),
};

const Controller = new CarController(ServiceMock);

test('Configure Routes correctly', () => {
  const app = {
    get: jest.fn(),
    post: jest.fn(),
  };
  Controller.configureRoutes(app);
});

test('Create renders form.html', () => {
  const renderMock = jest.fn();

  Controller.create({}, { render: renderMock });

  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('car/views/form.html');
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
  expect(ServiceMock.getById).toHaveBeenCalledTimes(1);
});

test('Delete calls service and redirects to home', async () => {
  const redirectMock = jest.fn();
  const FAKE_CAR = new Car({ id: 1 });
  ServiceMock.getById.mockImplementationOnce(() => Promise.resolve(FAKE_CAR));

  await Controller.delete(
    { params: { id: 1 }, session: { errors: [], messages: [] } },
    { redirect: redirectMock }
  );

  expect(ServiceMock.delete).toHaveBeenCalledTimes(1);
  expect(ServiceMock.delete).toHaveBeenCalledWith(FAKE_CAR);
  expect(redirectMock).toHaveBeenCalledTimes(1);
});
/*
test('Index renders index.html', async () => {
  const renderMock = jest.fn();

  await Controller.index({ session: { messages: [], errors: [] } }, { render: renderMock });

  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('car/views/index.html', {
    data: { cars: [] },
    messages: [],
    errors: [],
  });
});
*/
