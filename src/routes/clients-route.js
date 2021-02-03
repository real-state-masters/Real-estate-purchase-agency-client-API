const { Router } = require("express");

const { authMiddleware } = require("../middleware/auth-middleware");

const clientsRouter = Router();

const clientController = require("../controllers/client-controller");

clientsRouter.get("/clients/:clientID", clientController.getClientDetails);

clientsRouter.post("/clients", clientController.createClient);

clientsRouter.post("/sign-up", authMiddleware, clientController.signUp);

module.exports = clientsRouter;
