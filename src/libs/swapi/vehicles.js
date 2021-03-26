const fetch = require("node-fetch");

class Vehicle {
  constructor() {
    this.baseUrl = "https://swapi.dev/api/vehicles";
  }

  async get({ id, page = 1 }) {
    if (id)
      return await fetch(`${this.baseUrl}/${id}`).then((res) => res.json());

    return await fetch(`${this.baseUrl}?page=${page}`).then((res) =>
      res.json()
    );
  }
}

module.exports = Vehicle;
