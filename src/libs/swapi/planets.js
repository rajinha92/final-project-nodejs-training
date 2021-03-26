const fetch = require("node-fetch");

class Planet {
  constructor() {
    this.baseUrl = "https://swapi.dev/api/planets";
  }

  async get({ id, page = 1 }) {
    if (id)
      return await fetch(`${this.baseUrl}/${id}`).then((res) => res.json());
    return await fetch(`${this.baseUrl}?page=${page}`).then((res) =>
      res.json()
    );
  }
}

module.exports = Planet;
