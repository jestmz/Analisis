const RentController = require('../rentController');
const Rent = require('../../entity/rentEntity');
const { fromDataToEntity } = require('../../mapper/rentMapper');

const rentServiceMock = {
  save: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  delete: jest.fn(),
};

const carServiceMock = {
  getAll: jest.fn(),
};

const clientServiceMock = {
  getAll: jest.fn(),
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

const RENT_MOCK = {
  id: 'id',
  pricePerDay: 'pricePerDay',
  startingDate: 'startingDate',
  finishingDate: 'finishingDate',
  totalPrice: 'totalPrice',
  paymentMethod: 'paymentMethod',
  isPaid: 'isPaid',
  CarId: 'CarId',
  ClientId: 'ClientId',
};

const Controller = new RentController(rentServiceMock, carServiceMock, clientServiceMock);

test('Configure Routes correctly', () => {
  const app = {
    get: jest.fn(),
    post: jest.fn(),
  };
  Controller.configureRoutes(app);
});

test('Index calls Service and renders index.html with rents list ', async () => {
  const res = mockResponse();
  const req = mockRequest();
  res.render = jest.fn();
  req.session = {
    messages: [],
    errors: [],
  };
  const { messages, errors } = req.session;
  rentServiceMock.getAll.mockImplementation(() => []);
  const rentList = rentServiceMock.getAll();
  await Controller.index(req, res);

  expect(res.render).toHaveBeenCalledTimes(1);
  expect(res.render).toHaveBeenCalledWith('rent/views/index.html', {
    data: { rentList },
    messages,
    errors,
  });
});

test('Create redirects to /rent if card or/and clients are < 0 ', async () => {
  const res = mockResponse();
  const req = mockRequest();
  res.render = jest.fn();

  carServiceMock.getAll.mockImplementation(() => []);
  clientServiceMock.getAll.mockImplementation(() => []);

  await Controller.create(req, res);

  expect(res.redirect).toHaveBeenCalledTimes(1);
  expect(res.redirect).toHaveBeenCalledWith('/rent');
});

test('Create renders form only if Cars and Clients exists already ', async () => {
  const res = mockResponse();
  const req = mockRequest();
  res.render = jest.fn();

  carServiceMock.getAll.mockImplementation(() => Array.from({ length: 3 }));
  clientServiceMock.getAll.mockImplementation(() => Array.from({ length: 3 }));

  const cars = carServiceMock.getAll();
  const clients = clientServiceMock.getAll();

  await Controller.create(req, res);

  expect(res.render).toHaveBeenCalledTimes(1);
  expect(res.render).toHaveBeenCalledWith('rent/views/form.html', { data: { cars, clients } });
});

test('Save calls Service and redirects to /rent ', async () => {
  const res = mockResponse();
  const req = mockRequest();
  res.redirect = jest.fn();
  req.body = RENT_MOCK;
  await Controller.save(req, res);

  expect(rentServiceMock.save).toHaveBeenCalledTimes(1);
  expect(rentServiceMock.save).toHaveBeenCalledWith(fromDataToEntity(req.body));

  expect(res.redirect).toHaveBeenCalledTimes(1);
  expect(res.redirect).toHaveBeenCalledWith('/rent');
});

test('Save redirects to /rent if theres an error', async () => {
  const res = mockResponse();
  const req = mockRequest();
  rentServiceMock.save.rejects;
  await Controller.save(req, res);

  expect(res.redirect).toHaveBeenCalledTimes(1);
  expect(res.redirect).toHaveBeenCalledWith('/rent');
});

test('Delete calls Service and redirects to /rent ', async () => {
  const res = mockResponse();
  const req = mockRequest();
  res.redirect = jest.fn();
  req.params.id = 1;

  rentServiceMock.getById.mockImplementation((RENT_MOCK) => fromDataToEntity(RENT_MOCK));
  const rent = rentServiceMock.getById(req.params.id);
  await Controller.delete(req, res);

  expect(rentServiceMock.getById).toHaveBeenCalledTimes(2);
  expect(rentServiceMock.getById).toHaveBeenCalledWith(req.params.id);

  expect(rentServiceMock.delete).toHaveBeenCalledTimes(1);
  expect(rentServiceMock.delete).toHaveBeenCalledWith(rent);

  expect(res.redirect).toHaveBeenCalledTimes(1);
  expect(res.redirect).toHaveBeenCalledWith('/rent');
});

test('Edit calls Service adn renders form.html with rent data', async () => {
  const res = mockResponse();
  const req = mockRequest();
  res.render = jest.fn();
  req.params.id = 1;

  rentServiceMock.getById.mockImplementation((RENT_MOCK) => fromDataToEntity(RENT_MOCK));
  const rent = rentServiceMock.getById(req.params.id);

  await Controller.edit(req, res);
  expect(res.render).toHaveBeenCalledTimes(1);
  expect(res.render).toHaveBeenCalledWith('rent/views/form.html', { data: { rent } });
});
test('Edit calls Service and redirects to /rent if theres an error', async () => {
  const res = mockResponse();
  const req = mockRequest();

  rentServiceMock.getById.mockImplementation().rejects;

  await Controller.edit(req, res);
  expect(res.redirect).toHaveBeenCalledTimes(1);
  expect(res.redirect).toHaveBeenCalledWith('/rent');
});
