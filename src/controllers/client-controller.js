const db = require("../models/");
const { logger } = require("../config");

async function getClientDetails(req, res, next) {
  const { clientId } = req.params;

  try {
    const client = await db.Client.findOne({
      _id: clientId,
    })
      .select("-password -__v -createdAt -updatedAt")
      .lean()
      .exec();

    res.status(200).send({
      data: client,
    });
  } catch (error) {
    next(error);
  }
}

async function createClient(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await db.Client.create({
      email,
      password,
    });

    res.status(200).send({
      data: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function signUp(req, res, next) {
  const { uid, email } = req.user;

  try {
    const client = await db.Client.findOne({ email: email });

    if (client) {
      return res.sendStatus(200);
    }

    const newClient = await db.Client.create({
      _id: uid,
      email: email,
    });

    logger.debug(newClient);

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getClientDetails: getClientDetails,
  createClient: createClient,
  signUp: signUp,
};
