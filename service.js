const express = require("express");
const app = express();
const vueloDB = require("./db/vuelos");
const cors = require("cors");

app.use(cors());

app.get("/vuelos", async (req, res) => {
  console.log("GET /vuelos");
  try {
    const result = await vueloDB.getVuelos();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get(
  "/vuelos/origins-destinations/:origin/:destination",
  async (req, res) => {
    try {
      const result = await vueloDB.getVueloByOriginDestination(
        req.params.origin,
        req.params.destination
      );
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

app.get("/vuelos/flight_num-airline/:flight_num/:airline", async (req, res) => {
  console.log(req.params.flight_num, req.params.airline);
  try {
    const result = await vueloDB.getVuelosByFlightNumAirline(
      req.params.flight_num,
      req.params.airline
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/vuelos/origins-destinations", async (req, res) => {
  try {
    const origins = await vueloDB.getDistinctOrigins();
    const destinations = await vueloDB.getDistinctDestinations();
    res.status(200).json({
      success: true,
      data: { origins, destinations },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.use((req, res) => {
  console.log("Caught by catch-all route:", req.method, req.url);
  res.status(404).send("Not found");
});

app.get("/vuelos/:param1/:param2", (req, res) => {
  console.log(req.params.param1, req.params.param2);
  res.send("Route matched");
});
