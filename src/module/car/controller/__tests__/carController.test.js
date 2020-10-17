const CarController = require('../carController');
const Car = require('../../utilities/entity/carEntity');
const { fromDataToEntity } = require('../../utilities/mapper/carMapper');

const ServiceMock = {
  save: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  delete: jest.fn(),
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

test('Edit calls service and renders form.html', () => {
  const renderMock = jest.fn();
  const redirectMock = jest.fn();
  const MOCK_ID = 1;

  ServiceMock.getById.mockImplementationOnce(() => ({}));

  Controller.edit(
    { params: { id: MOCK_ID }, session: { errors: [], messages: [] } },
    { render: renderMock, redirect: redirectMock }
  );

  expect(ServiceMock.getById).toHaveBeenCalledWith(MOCK_ID);
  expect(ServiceMock.getById).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('car/views/form.html', { data: { car: {} } });
});

test('Deletes calls service and redirects to home', () => {
  const redirectMock = jest.fn();
  const MOCK_ID = 1;

  ServiceMock.getById.mockImplementationOnce(() => ({}));

  Controller.delete(
    { params: { id: MOCK_ID }, session: { errors: [], messages: [] } },
    { redirect: redirectMock }
  );

  expect(ServiceMock.delete).toHaveBeenCalledTimes(1);
  expect(ServiceMock.delete).toHaveBeenCalledWith({});
  expect(redirectMock).toHaveBeenCalledWith('/car');
});

test('Index renders index.html', () => {
  const renderMock = jest.fn();
  ServiceMock.getAll.mockImplementationOnce(() => []);

  Controller.index({ session: { errors: [], messages: [] } }, { render: renderMock });

  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('car/views/index.html', {
    data: { cars: [] },
    messages: [],
    errors: [],
  });
});
