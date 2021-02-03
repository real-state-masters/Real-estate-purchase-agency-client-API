const express = require("express");
const morgan = require("morgan");
const { json } = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config();

const app = express();

const errorMiddleware = require("./middleware/error-middleware");
const propertiesRouter = require("./routes/properties-route");
const clientsRouter = require("./routes/clients-route");

app.use(morgan("dev"));
app.use(helmet());
app.use(json());

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.use(propertiesRouter);
app.use(clientsRouter);

app.use(errorMiddleware);

module.exports = app;
