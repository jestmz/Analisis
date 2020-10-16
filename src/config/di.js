const { default: DIContainer, factory, object, get } = require("rsdi")
const { CarController, CarService } = require("../module/car/module")

function addCarModuleDefinitions(container) {
    container.addDefinitions({
        CarController: object(CarController).construct("CarService"),
        CarService: object(CarService)
    })
}

function configureDI() {
    const container = new DIContainer
    addCarModuleDefinitions(container)
    return container
}

module.exports = configureDI