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

propertiesRouter.get("/location", propertiesController.getByLocation);

propertiesRouter.get("/services", propertiesController.getByServices);

propertiesRouter.get(
  "/favorites",
  authMiddleware,
  propertiesController.getFavorites,
);

propertiesRouter.get(
  "/bookings",
  authMiddleware,
  propertiesController.getBookings,
);

propertiesRouter.get("/cart", authMiddleware, propertiesController.getCart);

propertiesRouter.post(
  "/buy/:propertyID",
  authMiddleware,
  propertiesController.buyProperty,
);

module.exports = propertiesRouter;

//TODO
//buy
// cancel buy
// contact //duda si es desde aqui
