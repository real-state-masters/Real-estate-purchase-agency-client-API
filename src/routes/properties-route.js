const { Router } = require("express");

const propertiesRouter = Router();

const propertiesController = require("../controllers/property-controller");

propertiesRouter.get("/properties", propertiesController.getProperties);

// propertiesRouter.get("/properties/:propertyID", propertiesController.getProperty);

// propertiesRouter.get("/properties/:location", propertiesController.searchByLocation);

// propertiesRouter.get("/properties/:services", propertiesController.searchByServices);

module.exports = propertiesRouter;
