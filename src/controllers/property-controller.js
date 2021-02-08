const axios = require("axios");
const db = require("../models/");
const config = require("../config");

// let propertiesObject = [
//   {
//     id: "1234",
//     type: "Home",
//   },
//   {
//     id: "2569",
//     type: "Home",
//   },
//   {
//     id: "5369",
//     type: "Home",
//   },
//   {
//     id: "12354",
//     type: "Home",
//   },
//   {
//     id: "5236",
//     type: "Home",
//   },
// ];

let propertyObject = {
  id: "1234",
  type: "Home",
};

async function getProperties(req, res, next) {
  try {
    let properties = await axios.get(
      "https://real-state-admin.herokuapp.com/api/properties",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + config.token,
        },
      },
    );

    if (req.user) {
      properties = await propertieschangePropertiesLoggedClient(
        properties,
        req.user.uid,
      );
    }

  } catch (ex) {
    next(ex);
  }
}

async function getProperty(req, res, next) {
  const propertyID = req.params.propertyID;

  try {
    let property = await axios.get(
      "https://restcountries.eu/rest/v2/callingcode/" + propertyID,
    );

    if (req.user) {
      property = await addAllPropertyClient(propertyObject, req.user.uid);
    }

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

// TODO Add function to setFAV and unwanted

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

// TODO Add function to setFAV and unwanted

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

async function getFavorites(req, res, next) {
  const user = req.user;

  try {
    const favorites = await db.Client.findOne({
      _id: user.uid,
    }).select({
      _id: 0,
      favorites: 1,
    });

    if (favorites) {
      const favProperties = await axios.get(
        "https://restcountries.eu/rest/v2/all",
        {
          params: favorites,
        },
      );

      res.status(200).send({
        data: favProperties.data,
        error: null,
      });
    } else throw new Error("Your favorites list is empty");
  } catch (ex) {
    next(ex);
  }
}

async function getBookings(req, res, next) {
  const user = req.user;

  try {
    const bookings = await db.Client.findOne({
      _id: user.uid,
    }).select({
      _id: 0,
      booked_properties: 1,
    });

    if (bookings) {
      const bookProperties = await axios.get(
        "https://restcountries.eu/rest/v2/all",
        {
          params: bookings,
        },
      );

      res.status(200).send({
        data: bookProperties,
        error: null,
      });
    } else throw new Error("Your booking list is empty");
  } catch (ex) {
    next(ex);
  }
}

async function getCart(req, res, next) {
  const user = req.user;

  try {
    const cart = await db.Client.findOne({
      _id: user.uid,
    }).select({
      _id: 0,
      shopping_cart: 1,
    });

    if (cart) {
      const cartProperties = await axios.get(
        "https://restcountries.eu/rest/v2/all",
        {
          params: cart,
        },
      );

      res.status(200).send({
        data: cartProperties,
        error: null,
      });
    } else throw new Error("Your cart list is empty");
  } catch (ex) {
    next(ex);
  }
}

async function callClientDB(clientID) {
  const clientAuth = await db.Client.findOne({
    _id: clientID,
  }).select({
    favorites: 1,
    unwanted_properties: 1,
  });

  return clientAuth;
}

async function addFavtoProperties(clientAuth, data) {
  data.map(function (el) {
    clientAuth.favorites.forEach((fav) => {
      if (fav === el["id"]) el["fav"] = true;
    });
  });
  return data;
}

async function dropUnwantedfromProperties(clientAuth, data) {
  data.map(function (el) {
    clientAuth.unwanted_properties.forEach((unw) => {
      if (unw === el["id"]) {
        const index = data.indexOf(el);
        if (index > -1) {
          data.splice(index, 1);
        }
      }
    });
  });
  return data;
}

async function propertieschangePropertiesLoggedClient(data, clientID) {
  const clientAuth = await callClientDB(clientID);

  if (clientAuth) {
    if (clientAuth.favorites.length) {
      data = await addFavtoProperties(clientAuth, data);
    }
    if (clientAuth.unwanted_properties.length) {
      data = await dropUnwantedfromProperties(clientAuth, data);
    }

    console.log(data);

    return data;
  } else {
    throw new Error("The client doesn't exist");
  }
}

async function addAllPropertyClient(data, clientID) {
  const clientAuth = await callClientDB(clientID);
  if (clientAuth) {
    if (clientAuth.favorites.length) {
      clientAuth.favorites.map((fav) => {
        if (fav === data.id) data["fav"] = true;
      });
    }
    if (clientAuth.unwanted_properties.length) {
      if (clientAuth.unwanted_properties.length) {
        clientAuth.unwanted_properties.map((unw) => {
          if (unw === data.id) {
            data = {};
          }
        });
      }
    }

    console.log(data);

    return data;
  } else {
    throw new Error("The client doesn't exist");
  }
}

module.exports = {
  getProperties: getProperties,
  getProperty: getProperty,
  getByLocation: getByLocation,
  getByServices: getByServices,
  getFavorites: getFavorites,
  getBookings: getBookings,
  getCart: getCart,
};
