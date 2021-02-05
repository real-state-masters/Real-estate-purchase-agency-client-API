const { Router } = require("express");

const { authMiddleware } = require("../middleware/auth-middleware");

const clientsRouter = Router();

const clientController = require("../controllers/client-controller");

clientsRouter.get("/clients/:clientID", clientController.getClientDetails);

clientsRouter.post("/clients", clientController.createClient);

clientsRouter.post("/sign-up", authMiddleware, clientController.signUp);

clientsRouter.post("/favorites", authMiddleware, clientController.addFavorites);

clientsRouter.delete(
  "/favorites/:propertyID",
  authMiddleware,
  clientController.deleteFavorite,
);

clientsRouter.post("/bookings", authMiddleware, clientController.bookProperty);

clientsRouter.delete(
  "/bookings/:propertyID",
  authMiddleware,
  clientController.deleteBookProperty,
);

clientsRouter.post("/unseen", authMiddleware, clientController.unseenProperty);

clientsRouter.post("/cart", authMiddleware, clientController.addCartProperty);

clientsRouter.delete(
  "/cart/:propertyID",
  authMiddleware,
  clientController.deleteCartProperty,
);

// TODO
// clientsRouter.post("/buy", clientController.buyProperty);
module.exports = clientsRouter;
