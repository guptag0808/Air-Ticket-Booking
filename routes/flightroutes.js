const express = require("express");
const {  FlightModel } = require("../models/flightModel.js");
const flightRoute = express.Router();

flightRoute.get("/flights", async (req, res) => {
  try {
    const flights = await FlightModel.find();
    res.status(200).send(flights);
  } catch (err) {
    res
      .status(500)
      .send({ msg: "Error in retrieving flight details", error: err.message });
  }
});

flightRoute.get("/flights/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const flights = await FlightModel.findById(id);

    if (!flights) {
      res.status(404).send({ msg: "Flight not found" });
    }
    res.status(200).send(flights);
  } catch (err) {
    res
      .status(500)
      .send({ msg: "Error in retrieving flight details", error: err.message });
  }
});

flightRoute.post("/flights", async (req, res) => {
	
  try {
	const {
		airline,flightNo,departure,	arrival,departureTime, arrivalTime,seats,price  } = req.body;
	const flight = new FlightModel({
      airline,
      flightNo,
      departure,
      arrival,
      departureTime,
	  arrivalTime,
      seats,
      price,
    });
    await flight.save();

    res.status(200).send({ msg: "Flight posted successfully", flight });
  } catch (err) {
    res
      .status(500)
      .send({ msg: "Something went wrong", error: err.message });
  }
});

flightRoute.put("/flights/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const {
      airline,
      flightNo,
      departure,
      arrival,
      departureTime,
      arrivalTime,
      seats,
      price,
    } = req.body;
    const flights = await FlightModel.findByIdAndUpdate(id,
      {
        airline,
        flightNo,
        departure,
        arrival,
        departureTime,
		arrivalTime,
        seats,
        price,
      },
      { new: true }
    );

    if (!flights) {
      res.status(404).send({ msg: "Flight not found" });
    }
    res.status(200).send({ msg: "Flight updated successfully", flights });
  } catch (err) {
    res
      .status(500)
      .send({ msg: "Something Went wrong", error: err.message });
  }
});

flightRoute.delete("/flights/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const flight = await FlightModel.findByIdAndDelete(id);
    if (!flight) {
      return res.status(404).send({ msg: "Flight not found" });
    }

    res.status(200).send({ msg: "Flight deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ msg: "Error in deleting flight", error: err.message });
  }
});

module.exports={
    flightRoute
}