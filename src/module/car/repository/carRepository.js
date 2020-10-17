const { fromDatabaseToEntity } = require('../utilities/mapper/carMapper');

module.exports = class CarRepository {
  /**
   * @param  {import("better-sqlite3").Database} databaseAdapter
   */
  constructor(databaseAdapter) {
    this.databaseAdapter = databaseAdapter;
  }

  /**
   * @param  {import("../utilities/entity/carEntity")} car
   */
  create(car) {
    const statement = this.databaseAdapter.prepare(`
    INSERT INTO cars (
      brand,
      model,
      year,
      kms,
      color,
      air_conditioning,
      passengers
    )
    values(?,?,?,?,?,?,?)
    `);

    const result = statement.run(
      car.brand,
      car.model,
      car.year,
      car.kms,
      car.color,
      car.air_conditioning,
      car.passengers
    );

    const id = result.lastInsertRowid;
    return this.getById(id);
  }
  /**
   * @param  {import("../utilities/entity/carEntity")} car
   */
  update(car) {
    const id = car.id;
    const carUpdate = this.databaseAdapter.prepare(`
      UPDATE cars SET
      brand = ?,
      model = ?,
      year = ?,
      kms = ?,
      color = ?,
      air_conditioning = ?,
      passengers = ?
      WHERE id = ?
    `);

    const params = [
      car.brand,
      car.model,
      car.year,
      car.kms,
      car.color,
      car.air_conditioning,
      car.passengers,
      car.id,
    ];

    carUpdate.run(params);

    return this.getById(id);
  }

  getById(id) {
    const car = this.databaseAdapter.prepare(`SELECT * FROM cars WHERE id = ?`).get(id);
    if (!car) {
      return undefined;
    }
    return fromDatabaseToEntity(car);
  }

  delete(car) {
    const id = car.id;
    this.databaseAdapter.prepare(`DELETE FROM cars WHERE id = ?`).run(id);
    return true;
  }

  getAll() {
    const cars = this.databaseAdapter.prepare(`SELECT * FROM cars`).all();
    console.log(cars);
    return cars.map((car) => fromDatabaseToEntity(car));
  }
};
