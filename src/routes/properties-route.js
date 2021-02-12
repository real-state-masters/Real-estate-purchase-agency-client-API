const { Router } = require("express");

const propertiesRouter = Router();
const { authMiddleware } = require("../middleware/auth-middleware");
const { checkAuthMiddleware } = require("../middleware/check-auth-middleware");

const propertiesController = require("../controllers/property-controller");

propertiesRouter.get(
  "/properties",
  checkAuthMiddleware,
  propertiesController.getProperties,
);

propertiesRouter.get(
  "/properties/:propertyID",
  checkAuthMiddleware,
  propertiesController.getProperty,
);

propertiesRouter.get(
  "/location/:address",
  checkAuthMiddleware,
  propertiesController.getByLocation,
);

propertiesRouter.get(
  "/favorites",
  authMiddleware,
  propertiesController.getFavorites,
);

propertiesRouter.post(
  "/buy/:propertyID",
  authMiddleware,
  propertiesController.buyProperty,
);

propertiesRouter.get(
  "/buyHistorial",
  authMiddleware,
  propertiesController.buyHistorialDetails,
);

module.exports = propertiesRouter;

//TODO
//buy
// cancel buy
// contact //duda si es desde aqui
