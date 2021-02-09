const axios = require("axios");
const db = require("../models/");
const config = require("../config");

/* PROPERTIES ENDPOINTS */

// get all properties if a client is logged verify favorites and unseen
async function getProperties(req, res, next) {
  try {
    let properties = await axios.get(
      "https://real-state-admin.herokuapp.com/api/properties",
      {
        headers: {
          Authorization: `Bearer ${config.token}`,
        },
      },
    );

    if (req.user) {
      properties.data = await propertieschangePropertiesLoggedClient(
        properties.data,
        req.user.uid,
      );
    }

    if (Object.entries(properties).length !== 0) {
      res.status(200).send({
        data: properties.data,
        error: null,
      });
    } else {
      throw new Error("There is no properties");
    }
  } catch (ex) {
    next(ex);
  }
}

// get a property by ID if a client is logged verify favorites and unseen
async function getProperty(req, res, next) {
  const propertyID = req.params.propertyID;

  try {
    let property = await axios.get(
      "https://real-state-admin.herokuapp.com/api/properties/" + propertyID,
      {
        headers: {
          Authorization: `Bearer ${config.token}`,
        },
      },
    );

    if (req.user) {
      property.data = await addAllPropertyClient(property.data, req.user.uid);
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

// TODO get properties by location if a client is logged verify favorites and unseen

async function getByLocation(req, res, next) {
  const locationParams = req.query;

  try {
    const properties = await axios.get(
      "https://real-state-admin.herokuapp.com/api/location/",
      {
        params: locationParams,
      },
    );

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
    const clientAuth = await db.Client.findOne({
      _id: user.uid,
    }).select({
      _id: 0,
      favorites: 1,
    });

    if (clientAuth) {
      const favProperties = clientAuth.favorites.map(
        (fav) =>
          (fav = axios.get(
            "https://real-state-admin.herokuapp.com/api/properties/" + fav,
            {
              headers: {
                Authorization: `Bearer ${config.token}`,
              },
            },
          )),
      );

      let reqFavProperties = await Promise.all(favProperties);

      reqFavProperties = reqFavProperties.map(
        (favProperty) => favProperty.data.data,
      );

      res.status(200).send({
        data: reqFavProperties,
        error: null,
      });
    } else throw new Error("Your favorites list is empty");
  } catch (ex) {
    next(ex);
  }
}

// Buy a property and send info to Admin server to change status
async function buyProperty(req, res, next) {
  const {
    name,
    lastname,
    phone,
    current_address,
    profession,
    heritage,
    email,
  } = req.body;
  const propertyID = req.params.propertyID;

  try {
    const client = await db.Client.findOneAndUpdate(
      {
        _id: req.user.uid,
      },
      {
        $addToSet: {
          bought_properties: {
            contact: {
              name: name,
              lastname: lastname,
              phone: phone,
              current_address: current_address,
              profession: profession,
              heritage: heritage,
              email: email,
            },
            property_id: propertyID,
          },
        },
      },
      {
        new: true,
      },
    ).select({
      bought_properties: 1,
    });

    if (client) {
      const buyToAdmin = await axios.post(
        "https://real-state-admin.herokuapp.com/api/properties/buy",
        { id: req.params.propertyID },
        {
          headers: {
            Authorization: `Bearer ${config.token}`,
          },
        },
      );

      console.log(buyToAdmin.data);
      res.status(200).send({
        data: buyToAdmin.data,
      });
    }
  } catch (error) {
    next(error);
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
      if (fav === el["_id"]) el["fav"] = true;
    });
  });
  return data;
}

async function dropUnwantedfromProperties(clientAuth, data) {
  data.map(function (el) {
    clientAuth.unwanted_properties.forEach((unw) => {
      if (unw === el["_id"]) {
        const index = data.indexOf(el);
        if (index > -1) {
          data.splice(index, 1);
        }
      }
    });
  });
  return data;
}

async function propertieschangePropertiesLoggedClient(properties, clientID) {
  const clientAuth = await callClientDB(clientID);

  if (clientAuth) {
    if (clientAuth.favorites.length) {
      properties = await addFavtoProperties(clientAuth, properties);
    }
    if (clientAuth.unwanted_properties.length) {
      properties = await dropUnwantedfromProperties(clientAuth, properties);
    }

    return properties;
  } else {
    throw new Error("The client doesn't exist");
  }
}

async function addAllPropertyClient(data, clientID) {
  const clientAuth = await callClientDB(clientID);
  if (clientAuth) {
    if (clientAuth.favorites.length) {
      clientAuth.favorites.map((fav) => {
        if (fav === data.data["_id"]) data.data["fav"] = true;
      });
    }
    if (clientAuth.unwanted_properties.length) {
      clientAuth.unwanted_properties.map((unw) => {
        if (unw === data.data["_id"]) {
          console.log("Hello");
          data = {};
        }
      });
    }

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
  buyProperty: buyProperty,
};
