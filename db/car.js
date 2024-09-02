const knex = require("./knex");

function createCar(car) {
  return knex.raw(
    "INSERT INTO cars (make, model, year) VALUES (?, ?, ?) RETURNING *",
    [car.make, car.model, car.year]
  );
}

function getCars() {
  return knex.raw("SELECT * FROM cars");
}

function updateCar(id, car) {
  return knex.raw(
    "UPDATE cars SET make = ?, model = ?, year = ? WHERE id = ? RETURNING *",
    [car.make, car.model, car.year, id]
  );
}

function deleteCar(id) {
  return knex.raw("DELETE FROM cars WHERE id = ? RETURNING *", [id]);
}

module.exports = {
  createCar,
  getCars,
  updateCar,
  deleteCar,
};
