const { Router } = require("express");
const { authMiddleware } = require("../middleware/auth-middleware.js");
const clientsRouter = Router();
const clientController = require("../controllers/client-controller");

clientsRouter.get(
  "/clients/:clientID",
  authMiddleware,
  clientController.getClientDetails,
);
clientsRouter.post("/sign-up", authMiddleware, clientController.signUp);
clientsRouter.post("/favorites", authMiddleware, clientController.addFavorites);
clientsRouter.delete(
  "/favorites/:propertyID",
  authMiddleware,
  clientController.deleteFavorite,
);
clientsRouter.post("/unseen", authMiddleware, clientController.unseenProperty);

module.exports = clientsRouter;
