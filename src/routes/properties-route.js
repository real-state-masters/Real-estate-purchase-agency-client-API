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

module.exports = propertiesRouter;
