const { Router } = require("express");

const propertiesRouter = Router();

const propertiesController = require("../controllers/property-controller");

propertiesRouter.get("/properties", propertiesController.getProperties);

propertiesRouter.get(
  "/properties/:propertyID",
  propertiesController.getProperty,
);

propertiesRouter.get("/location", propertiesController.getByLocation);

propertiesRouter.get("/services", propertiesController.getByServices);

// propertiesRouter.post("/favorites", propertiesController.addFavorites);

// propertiesRouter.delete("/favorites/:propertyID", propertiesController.deleteFavorites);

// propertiesRouter.post("/bookings", propertiesController.bookProperty);

// propertiesRouter.delete("/bookings/:propertyID", propertiesController.deleteBookProperty);

module.exports = propertiesRouter;
