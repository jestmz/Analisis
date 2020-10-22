module.exports = class Rent {
  constructor({
    id,
    pricePerDay,
    startingDate,
    finishingDate,
    totalPrice,
    paymentMethod,
    isPaid,
    CarId,
    ClientId,
  }) {
    this.id = id;
    this.pricePerDay = pricePerDay;
    this.startingDate = startingDate;
    this.finishingDate = finishingDate;
    this.totalPrice = totalPrice;
    this.paymentMethod = paymentMethod;
    this.isPaid = isPaid;
    this.CarId = CarId;
    this.ClientId = ClientId;
  }
};
