const axios = require("axios");

async function getProperties(req, res, next) {
  try {
    const properties = await axios.get("https://restcountries.eu/rest/v2/all");

    res.status(200).send({
      data: properties.data,
      error: null,
    });
  } catch (ex) {
    next(ex);
  }
}

async function getProperty(req, res, next) {
  const propertyID = req.params.propertyID;

  try {
    const property = await axios.get(
      "https://restcountries.eu/rest/v2/callingcode/" + propertyID,
    );

    if (property) {
      res.status(200).send({
        data: property.data,
        error: null,
      });
    }
  } catch (ex) {
    next(ex);
  }
}

async function getByLocation(req, res, next) {
  const locationParams = req.query;

  try {
    const properties = await axios.get("https://restcountries.eu/rest/v2/all", {
      params: locationParams,
    });

    res.status(200).send({
      data: properties.data,
      error: null,
    });
  } catch (ex) {
    next(ex);
  }
}

async function getByServices(req, res, next) {
  const serviceParams = req.query;

  try {
    const properties = await axios.get("https://restcountries.eu/rest/v2/all", {
      params: serviceParams,
    });

    res.status(200).send({
      data: properties.data,
      error: null,
    });
  } catch (ex) {
    next(ex);
  }
}

module.exports = {
  getProperties: getProperties,
  getProperty: getProperty,
  getByLocation: getByLocation,
  getByServices: getByServices,
};
