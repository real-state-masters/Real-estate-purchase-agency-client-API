const { Router } = require("express");

const { authMiddleware } = require("../middleware/auth-middleware");

const clientsRouter = Router();

const clientController = require("../controllers/client-controller");

clientsRouter.get("/clients/:clientID", clientController.getClientDetails);

clientsRouter.post("/clients", clientController.createClient);

clientsRouter.post("/sign-up", authMiddleware, clientController.signUp);

clientsRouter.post("/favorites/:clientID", clientController.addFavorites);

clientsRouter.delete(
  "/favorites/:clientID/:propertyID",
  clientController.deleteFavorite,
);

clientsRouter.post("/bookings/:clientID", clientController.bookProperty);

clientsRouter.delete(
  "/bookings/:clientID/:propertyID",
  clientController.deleteBookProperty,
);

clientsRouter.post("/unseen/:clientID", clientController.unseenProperty);

clientsRouter.post("/cart/:clientID", clientController.addCartProperty);

clientsRouter.delete(
  "/cart/:clientID/:propertyID",
  clientController.deleteCartProperty,
);

// TODO
// clientsRouter.post("/buy", clientController.buyProperty);
module.exports = clientsRouter;
