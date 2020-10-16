module.exports = class CarRepository {
  /**
   * @param  {import("better-sqlite3").Database} databaseAdapter
   */
  constructor(databaseAdapter) {
    this.databaseAdapter = databaseAdapter;
    console.log(process.cwd() + '/data/database.db');
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

    return;
  }
};
