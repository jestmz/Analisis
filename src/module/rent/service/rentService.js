module.exports = class RentService {
  /**
   * @param  {import("../repository/RentRepository")} RentRepository
   */
  constructor(RentRepository) {
    this.RentRepository = RentRepository;
  }

  async save(rent) {
    if (rent.id) {
      return this.RentRepository.update(rent);
    } else {
      return this.RentRepository.create(rent);
    }
  }

  async getAll() {
    return this.RentRepository.getAll();
  }

  async getById(id) {
    return this.RentRepository.getById(id);
  }

  async delete(rent) {
    return this.RentRepository.delete(rent);
  }
};
