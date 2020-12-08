module.exports = class RentService {
  /**
   * @param  {import("../repository/RentRepository")} RentRepository
   */
  constructor(RentRepository) {
    this.RentRepository = RentRepository;
  }

  async save(rent) {
    if (rent.id) {
      return await this.RentRepository.update(rent);
    } else {
      return await this.RentRepository.create(rent);
    }
  }

  async getAll() {
    return await this.RentRepository.getAll();
  }

  async getById(id) {
    return await this.RentRepository.getById(id);
  }

  async delete(rent) {
    return await this.RentRepository.delete(rent);
  }
};
