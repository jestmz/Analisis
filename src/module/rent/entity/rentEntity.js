module.exports = class Client {
  constructor({
    id,
    car,
    client,
    pricePerDay,
    startingDate,
    finishingDate,
    totalPrice,
    paymentMethod,
    isPaid,
  }) {
    this.id = id;
    this.car = car;
    this.client = client;
    this.pricePerDay = pricePerDay;
    this.startingDate = startingDate;
    this.finishingDate = finishingDate;
    this.totalPrice = totalPrice;
    this.paymentMethod = paymentMethod;
    this.isPaid = isPaid;
  }
};
