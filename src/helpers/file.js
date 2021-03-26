const fs = require("fs");
const path = require("path");

const EXPORT_PATH = path.dirname(path.dirname(__dirname)) + "\\exports\\";

module.exports = {
  exportCsv(data) {
    if (!fs.existsSync(EXPORT_PATH)) {
      fs.mkdirSync(EXPORT_PATH);
    }
    const filename = new Date().getTime().toString() + ".csv";
    let csv = "";
    for (const d of data) {
      csv += `${d.type},${d.date},${d.price}\n`;
    }

    fs.writeFileSync(EXPORT_PATH + filename, csv);

    return EXPORT_PATH + filename;
  },

  deleteExportedFile(filename) {
    fs.unlinkSync(filename);
  },
};
