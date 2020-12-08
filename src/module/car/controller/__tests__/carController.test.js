const CarController = require('../carController');
const Car = require('../../utilities/entity/carEntity');
const { fromDataToEntity } = require('../../utilities/mapper/carMapper');

const ServiceMock = {
  save: jest.fn(),
  getAll: jest.fn(() => []),
  getById: jest.fn(),
  delete: jest.fn(() => Promise.resolve(true)),
};

const mockResponse = () => {
  const res = {};
  res.redirect = jest.fn().mockReturnValue(res);
  return res;
};
const mockRequest = () => {
  const req = {};
  req.params = jest.fn().mockReturnValue(req);
  req.body = jest.fn().mockReturnValue(req);
  req.session = jest.fn().mockReturnValue(req);
  return req;
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

test('Save calls Service. if Car has not an ID then redirects to home', async () => {
  const req = mockRequest();
  const res = mockResponse();
  req.body = {
    brand: 'brand',
    model: 'model',
    year: 'year',
    kms: 'kms',
    color: 'color',
    airConditioning: 'airConditioning',
    passengers: 'passengers',
  };

  await Controller.save(req, res);

  expect(ServiceMock.save).toHaveBeenCalledWith(fromDataToEntity(req.body));
  expect(ServiceMock.save).toHaveBeenCalledTimes(1);

  expect(res.redirect).toHaveBeenCalledWith('/');
  expect(res.redirect).toHaveBeenCalledTimes(1);
});

test('Save calls Service. and redirects to home', async () => {
  const req = mockRequest();
  const res = mockResponse();
  req.body = {
    id: 1,
    brand: 'brand',
    model: 'model',
    year: 'year',
    kms: 'kms',
    color: 'color',
    airConditioning: 'airConditioning',
    passengers: 'passengers',
  };

  await Controller.save(req, res);

  expect(ServiceMock.save).toHaveBeenCalledWith(fromDataToEntity(req.body));
  expect(ServiceMock.save).toHaveBeenCalledTimes(2);

  expect(res.redirect).toHaveBeenCalledWith('/');
  expect(res.redirect).toHaveBeenCalledTimes(1);
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

test('Edit redirects to home if theres an error', async () => {
  const res = mockResponse();
  const req = mockRequest();

  ServiceMock.getById.mockImplementationOnce(() => ({})).rejects;
  await Controller.edit(req, res);
  expect(res.redirect).toHaveBeenCalledWith('/');
  expect(res.redirect).toHaveBeenCalledTimes(1);
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

test('Index renders index.html', async () => {
  const renderMock = jest.fn();

  const cars = ServiceMock.getAll();
  await Controller.index({ session: { messages: [], errors: [] } }, { render: renderMock });

  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('car/views/index.html', {
    data: { cars },
    messages: [],
    errors: [],
  });
});
