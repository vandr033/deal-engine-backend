const knex = require("knex");

const connectedKnex = knex({
  client: "sqlite3",
  connection: {
    filename: "deal-engine.sqlite3",
  },
  useNullAsDefault: true,
});

module.exports = connectedKnex;
