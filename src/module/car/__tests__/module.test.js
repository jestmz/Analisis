const { initCarModule } = require('../module');

const container = {
  get: jest.fn(() => controller),
};
const controller = {
  configureRoutes: jest.fn(),
};

const app = jest.fn();

test('Initialize car module correctly', () => {
  initCarModule(container, app);

  expect(container.get).toHaveBeenCalledTimes(1);
  expect(container.get).toHaveBeenCalledWith('CarController');
  expect(controller.configureRoutes).toHaveBeenCalledTimes(1);
  expect(controller.configureRoutes).toHaveBeenCalledWith(app);
});
