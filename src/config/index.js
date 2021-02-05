require("dotenv").config();
const logger = require("loglevel");

logger.enableAll();

const {
  NODE_ENV = "development",
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_DATABASE,
  JWT_SECRET,
  BCRYPT_SALT_ROUNDS,
} = process.env;

const baseConfig = {
  port: process.env.PORT || 4000,
  client: {
    URL: process.env.CLIENT_URL || "http://localhost:3000",
  },
  jwt: {
    secret: JWT_SECRET,
  },
  bcryptSaltRounds: parseInt(BCRYPT_SALT_ROUNDS),
  logger: {
    warn: logger.warn,
    info: logger.info,
    error: logger.error,
    trace: logger.trace,
    debug: logger.debug,
  },
};

const config = {
  development: {
    ...baseConfig,
    db: {
      url: `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.zkwdz.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`,
    },
    firebase: {
      certConfig: {
        type: process.env.FB_CERT_TYPE,
        project_id: process.env.FB_CERT_PROJECT_ID,
        private_key_id: process.env.FB_CERT_PRIVATE_KEY_ID,
        private_key: process.env.FB_CERT_PRIVATE_KEY,
        client_email: process.env.FB_CERT_CLIENT_EMAIL,
        client_id: process.env.FB_CERT_CLIENT_ID,
        auth_uri: process.env.FB_CERT_AUTH_URI,
        token_uri: process.env.FB_CERT_TOKEN_URI,
        auth_provider_x509_cert_url:
          process.env.FB_CERT_AUTH_PROVIDER_X_509_CERT_URL,
        client_x509_cert_url: process.env.FB_CERT_CLIENT_X_509_CERT_URL,
      },
    },
  },
  test: {
    ...baseConfig,
    db: {
      url: `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.zkwdz.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`,
    },
    firebase: {
      certConfig: {
        type: process.env.FB_CERT_TYPE,
        project_id: process.env.FB_CERT_PROJECT_ID,
        private_key_id: process.env.FB_CERT_PRIVATE_KEY_ID,
        private_key: process.env.FB_CERT_PRIVATE_KEY,
        client_email: process.env.FB_CERT_CLIENT_EMAIL,
        client_id: process.env.FB_CERT_CLIENT_ID,
        auth_uri: process.env.FB_CERT_AUTH_URI,
        token_uri: process.env.FB_CERT_TOKEN_URI,
        auth_provider_x509_cert_url:
          process.env.FB_CERT_AUTH_PROVIDER_X_509_CERT_URL,
        client_x509_cert_url: process.env.FB_CERT_CLIENT_X_509_CERT_URL,
      },
    },
  },
  production: {
    ...baseConfig,
    db: {
      url: `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.zkwdz.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`,
    },
    firebase: {
      certConfig: {
        type: process.env.FB_CERT_TYPE,
        project_id: process.env.FB_CERT_PROJECT_ID,
        private_key_id: process.env.FB_CERT_PRIVATE_KEY_ID,
        private_key: process.env.FB_CERT_PRIVATE_KEY,
        client_email: process.env.FB_CERT_CLIENT_EMAIL,
        client_id: process.env.FB_CERT_CLIENT_ID,
        auth_uri: process.env.FB_CERT_AUTH_URI,
        token_uri: process.env.FB_CERT_TOKEN_URI,
        auth_provider_x509_cert_url:
          process.env.FB_CERT_AUTH_PROVIDER_X_509_CERT_URL,
        client_x509_cert_url: process.env.FB_CERT_CLIENT_X_509_CERT_URL,
      },
    },
  },
};

module.exports = config[NODE_ENV];
