require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  db: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    dialect: process.env.DB_DIALECT || 'postgres',
  },
  keycloak: {
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
    serverUrl: process.env.KEYCLOAK_SERVER_URL,
    realm: process.env.KEYCLOAK_REALM,
    bearerOnly: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'dev-secret',
    accessExpirationMinutes: Number(process.env.JWT_ACCESS_EXPIRATION_MINUTES || 60),
  },
  bcrypt: {
    saltRounds: Number(process.env.BCRYPT_SALT_ROUNDS || 10),
  },
  logLevel: process.env.LOG_LEVEL || 'info',
};

module.exports = config;


