const Ticket = require("./../models/ticket");
const Rent = require("./../models/rent");
const Vehicle = require("./../libs/swapi/vehicles");
const {
  exportCsv: exportDataAsCsv,
  deleteExportedFile,
} = require("../helpers/file");
const vehicleApi = new Vehicle();

module.exports = {
  async listTickets(req, res) {
    try {
      const tickets = await Ticket.find().sort("-departureAt");
      return res.send(tickets);
    } catch (e) {
      console.error(e);
      return res.status(500).send(e.message);
    }
  },
  async listRented(req, res) {
    try {
      const rented = await Rent.find().sort("-departureAt");
      const vehicles = await vehicleApi.get({});
      const vehiclesStatus = vehicles.results.map((v, i) => {
        const id = i + 1;
        const now = new Date();
        const rentedVeh = rented.find(
          (r) =>
            r.vehicleId === id.toString() &&
            r.departureAt <= now &&
            r.returnAt >= now
        );

        return {
          ...v,
          id,
          isRented: !!rentedVeh,
          price: rentedVeh ? rentedVeh.price : 0,
        };
      });
      return res.send(vehiclesStatus);
    } catch (e) {
      console.error(e);
      return res.status(500).send(e.message);
    }
  },
  async exportCsv(req, res) {
    try {
      const tickets = await Ticket.find();
      const rented = await Rent.find();
      const report = [];
      for (const t of tickets) {
        report.push({
          type: "ticket",
          date: t.departureAt,
          price: t.price,
        });
      }
      for (const r of rented) {
        report.push({
          type: "rent",
          date: r.departureAt,
          price: r.price,
        });
      }

      const filename = exportDataAsCsv(report);
      return res.download(filename, "balance.csv", function (err) {
        if (err) console.error(err);
        else deleteExportedFile(filename);
      });
    } catch (e) {
      return res.status(500).send(e.message);
    }
  },
};
