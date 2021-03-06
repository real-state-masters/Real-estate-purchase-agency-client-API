const db = require("../models/");
const { logger } = require("../config");

async function getClientDetails(req, res, next) {
  const { clientId } = req.params;

  try {
    const client = await db.Client.findOne({
      _id: clientId,
    })
      .select("-password -__v -createdAt -updatedAt")
      .lean()
      .exec();

    res.status(200).send({
      data: client,
    });
  } catch (error) {
    next(error);
  }
}

async function signUp(req, res, next) {
  const { uid, email } = req.user;

  try {
    const client = await db.Client.findOne({
      email: email,
    });

    if (client) {
      return res.sendStatus(200);
    }

    const newClient = await db.Client.create({
      _id: uid,
      email: email,
    });

    logger.debug(newClient);

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

async function addFavorites(req, res, next) {
  const user = req.user;
  const propertyId = req.body.id;

  try {
    const addFavorites = await db.Client.findOneAndUpdate(
      {
        _id: user.uid,
      },
      {
        $addToSet: {
          favorites: propertyId,
        },
      },
      {
        new: true,
      },
    ).select({
      favorites: 1,
    });

    if (addFavorites) {
      res.status(200).send({
        data: addFavorites,
        error: null,
      });
    } else {
      res.status(400).send({
        error: "The client doesn't exist",
      });
    }
  } catch (ex) {
    next(ex);
  }
}

async function deleteFavorite(req, res, next) {
  const user = req.user;
  const propertyID = req.params.propertyID;

  try {
    const deleteFavorite = await db.Client.findOneAndUpdate(
      {
        _id: user.uid,
      },
      {
        $pull: {
          favorites: propertyID,
        },
      },
      {
        new: true,
      },
    ).select({
      favorites: 1,
    });

    if (deleteFavorite) {
      res.status(200).send({
        data: deleteFavorite,
        error: null,
      });
    } else {
      res.status(400).send({
        error: "The client doesn't exist",
      });
    }
  } catch (ex) {
    next(ex);
  }
}

async function bookProperty(req, res, next) {
  const user = req.user;
  const propertyId = req.body.id;

  try {
    const bookProperty = await db.Client.findOneAndUpdate(
      {
        _id: user.uid,
      },
      {
        $addToSet: {
          booked_properties: propertyId,
        },
      },
      {
        new: true,
      },
    ).select({
      booked_properties: 1,
    });

    if (bookProperty) {
      res.status(200).send({
        data: bookProperty,
        error: null,
      });
    } else {
      res.status(400).send({
        error: "The client doesn't exist",
      });
    }
  } catch (ex) {
    next(ex);
  }
}

async function deleteBookProperty(req, res, next) {
  const user = req.user;
  const propertyID = req.params.propertyID;

  try {
    const deleteBookProperty = await db.Client.findOneAndUpdate(
      {
        _id: user.uid,
      },
      {
        $pull: {
          booked_properties: propertyID,
        },
      },
      {
        new: true,
      },
    ).select({
      booked_properties: 1,
    });

    if (deleteBookProperty) {
      res.status(200).send({
        data: deleteBookProperty,
        error: null,
      });
    } else {
      res.status(400).send({
        error: "The client doesn't exist",
      });
    }
  } catch (ex) {
    next(ex);
  }
}

async function unseenProperty(req, res, next) {
  const user = req.user;
  const propertyId = req.body.id;

  try {
    const unseenProperty = await db.Client.findOneAndUpdate(
      {
        _id: user.uid,
      },
      {
        $addToSet: {
          unwanted_properties: propertyId,
        },
      },
      {
        new: true,
      },
    ).select({
      unwanted_properties: 1,
    });

    if (unseenProperty) {
      res.status(200).send({
        data: unseenProperty,
        error: null,
      });
    } else {
      res.status(400).send({
        error: "The client doesn't exist",
      });
    }
  } catch (ex) {
    next(ex);
  }
}

async function addCartProperty(req, res, next) {
  const user = req.user;
  const propertyId = req.body.id;

  try {
    const addCartProperty = await db.Client.findOneAndUpdate(
      {
        _id: user.uid,
      },
      {
        $addToSet: {
          shopping_cart: propertyId,
        },
      },
      {
        new: true,
      },
    ).select({
      shopping_cart: 1,
    });

    if (addCartProperty) {
      res.status(200).send({
        data: addCartProperty,
        error: null,
      });
    } else {
      res.status(400).send({
        error: "The client doesn't exist",
      });
    }
  } catch (ex) {
    next(ex);
  }
}

async function deleteCartProperty(req, res, next) {
  const user = req.user;
  const propertyID = req.params;
  try {
    const deleteCartProperty = await db.Client.findOneAndUpdate(
      {
        _id: user.uid,
      },
      {
        $pull: {
          shopping_cart: propertyID,
        },
      },
      {
        new: true,
      },
    ).select({
      shopping_cart: 1,
    });

    if (deleteCartProperty) {
      res.status(200).send({
        data: deleteCartProperty,
        error: null,
      });
    } else {
      res.status(400).send({
        error: "The client doesn't exist",
      });
    }
  } catch (ex) {
    next(ex);
  }
}

module.exports = {
  getClientDetails: getClientDetails,
  signUp: signUp,
  addFavorites: addFavorites,
  deleteFavorite: deleteFavorite,
  bookProperty: bookProperty,
  deleteBookProperty: deleteBookProperty,
  unseenProperty: unseenProperty,
  addCartProperty: addCartProperty,
  deleteCartProperty: deleteCartProperty,
};
