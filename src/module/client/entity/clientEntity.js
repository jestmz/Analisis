module.exports = class Client {
  constructor({ id, name, lastName, DNI, address, phone, email, birthday }) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.DNI = DNI;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.birthday = birthday;
  }
};
