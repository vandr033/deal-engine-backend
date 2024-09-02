const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
  path.resolve(__dirname, "../deal-engine.sqlite3"),
  (err) => {
    if (err) {
      console.error("Error opening database", err);
    } else {
      console.log("Database connected");
    }
  }
);

function runQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function createVuelo(vuelo) {
  const query = `INSERT INTO vuelos (origin, destination, airline, flight_num, origin_iata_code, origin_name, origin_latitude, origin_logitude, destination_iata_code, destination_name, destination_latitude, destination_longitude)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    vuelo.origin,
    vuelo.destination,
    vuelo.airline,
    vuelo.flight_num,
    vuelo.origin_iata_code,
    vuelo.origin_name,
    vuelo.origin_latitude,
    vuelo.origin_logitude,
    vuelo.destination_iata_code,
    vuelo.destination_name,
    vuelo.destination_latitude,
    vuelo.destination_longitude,
  ];
  return runQuery(query, params);
}

function getVuelos() {
  return runQuery("SELECT * FROM vuelos");
}

function getVueloByOriginDestination(origin, destination) {
  const query = `
      SELECT
        flight_num,
        MIN(origin) AS origin,
        MIN(destination) AS destination,
        MIN(airline) AS airline,
        MIN(origin_iata_code) AS origin_iata_code,
        MIN(origin_name) AS origin_name,
        MIN(origin_latitude) AS origin_latitude,
        MIN(origin_longitude) AS origin_longitude,
        MIN(destination_iata_code) AS destination_iata_code,
        MIN(destination_name) AS destination_name,
        MIN(destination_latitude) AS destination_latitude,
        MIN(destination_longitude) AS destination_longitude
      FROM vuelos
      WHERE origin = ? AND destination = ?
      GROUP BY flight_num
    `;
  return runQuery(query, [origin, destination]);
}

function getVuelosByFlightNumAirline(flight_num, airline) {
  console.log(flight_num, airline);
  return runQuery("SELECT * FROM vuelos WHERE flight_num = ? AND airline = ?", [
    flight_num,
    airline,
  ]);
}

function getDistinctOrigins() {
  return runQuery("SELECT DISTINCT origin FROM vuelos");
}

function getDistinctDestinations() {
  return runQuery("SELECT DISTINCT destination FROM vuelos");
}

module.exports = {
  createVuelo,
  getVuelos,
  getVueloByOriginDestination,
  getVuelosByFlightNumAirline,
  getDistinctOrigins,
  getDistinctDestinations,
};
