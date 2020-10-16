const CarEntity = require("../entity/carEntity")


module.exports = fromDataToEntity

function fromDataToEntity({ brand, model, year, kms, color, air_conditioning, passengers }) {
    return new CarEntity(brand, model, year, kms, color, air_conditioning, passengers)
}