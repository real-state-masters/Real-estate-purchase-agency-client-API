const axios = require("axios");

async function getProperties(req, res, next) {
  const properties = await axios
    .get("https://restcountries.eu/rest/v2/all")
    .catch(next);

  res.status(200).send({
    data: properties.data,
    error: null,
  });
}

async function getProperty(req, res, next) {
  const propertyID = req.params.propertyID;

  const property = await axios
    .get("https://restcountries.eu/rest/v2/callingcode/" + propertyID)
    .catch(next);

  if (property) {
    res.status(200).send({
      data: property.data,
      error: null,
    });
  } else {
    res.status(404).send({
      data: null,
      error: "Property not found",
    });
  }
}

async function getByLocation(req, res, next) {
  const locationParams = req.query;

  const properties = await axios
    .get("https://restcountries.eu/rest/v2/all", { params: locationParams })
    .catch(next);

  res.status(200).send({
    data: properties.data,
    error: null,
  });
}

async function getByServices(req, res, next) {
  const serviceParams = req.query;

  const properties = await axios
    .get("https://restcountries.eu/rest/v2/all", { params: serviceParams })
    .catch(next);

  res.status(200).send({
    data: properties.data,
    error: null,
  });
}

module.exports = {
  getProperties: getProperties,
  getProperty: getProperty,
  getByLocation: getByLocation,
  getByServices: getByServices,
};
