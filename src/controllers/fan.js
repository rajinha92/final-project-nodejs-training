const Planet = require("./../libs/swapi/planets");
const Vehicle = require("./../libs/swapi/vehicles");
const Ticket = require("./../models/ticket");
const Rent = require("./../models/rent");
const planetsApi = new Planet();
const vehiclesApi = new Vehicle();

module.exports = {
  async listPlanets(req, res) {
    const { page = 1 } = req.query;
    const { id } = req.params;
    const planets = await planetsApi.get({ id, page });

    const result = {
      hasNextPage: !!planets.next,
      page,
      data: planets.results
        ? planets.results.map((p, i) => ({ ...p, price: 100000, id: i + 1 }))
        : planets,
    };
    res.send(result);
  },
  async listVehicles(req, res) {
    const { page = 1 } = req.query;
    const { id } = req.params;
    const vehicles = await vehiclesApi.get({ id, page });
    const result = {
      hasNextPage: !!vehicles.next,
      page,
      data: vehicles.results
        ? vehicles.results.map((v, i) => ({ ...v, price: 54000, id: i + 1 }))
        : vehicles,
    };
    res.send(result);
  },
  async buyTicket(req, res) {
    const { id } = req.params;
    const { departureAt, price } = req.body;
    if (!id) return res.status(400).send("Planet id is required");
    if (!departureAt) return res.status(400).send("Departure date is required");

    try {
      const ticket = new Ticket({
        departureAt,
        planetId: id,
        price,
        userId: req.user._id,
      });

      await ticket.save();

      return res.status(201).send(ticket);
    } catch (e) {
      console.error(e);
      return res.status(500).send(e.message);
    }
  },
  async rentVehicle(req, res) {
    const { id } = req.params;
    const { departureAt, returnAt, price } = req.body;
    if (!id) return res.status(400).send("Vehicle id is required");
    if (!departureAt || !returnAt)
      return res
        .status(400)
        .send("Departure date and return date are required");

    try {
      const rent = new Rent({
        departureAt,
        returnAt,
        vehicleId: id,
        price,
        userId: req.user._id,
      });

      await rent.save();

      return res.status(201).send(rent);
    } catch (e) {
      console.error(e);
      return res.status(500).send(e.message);
    }
  },
};
