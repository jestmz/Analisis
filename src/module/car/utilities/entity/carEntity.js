module.exports = class Car {
  constructor({ id, brand, model, year, kms, color, air_conditioning, passengers }) {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.kms = kms;
    this.color = color;
    this.air_conditioning = air_conditioning;
    this.passengers = passengers;
  }
};
