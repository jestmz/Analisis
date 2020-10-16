const { default: DIContainer, factory, object, get } = require("rsdi")
const { CarController, CarService, CarRepository } = require("../module/car/module")

function addCarModuleDefinitions(container) {
    container.addDefinitions({
        CarController: object(CarController).construct(get("CarService")),
        CarService: object(CarService).construct(get("CarRepository")),
        CarRepository: object(CarRepository).construct()
    })
}

function configureDI() {
    const container = new DIContainer
    addCarModuleDefinitions(container)
    return container
}

module.exports = configureDI