const Keycloak = require('keycloak-connect');
const Jwt = require('jsonwebtoken');
const config = require('../config/config');

const authMiddleware = (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1];
  try {
    if (req.headers.authorization) {
      const keycloakConfig = {
        clientId: config.keycloak.clientId,
        bearerOnly: true,
        serverUrl: config.keycloak.serverUrl,
        realm: config.keycloak.realm,
        credentials: { secret: config.keycloak.clientSecret },
      };
      const keycloak = new Keycloak({}, keycloakConfig);
      keycloak.grantManager
        .validateAccessToken(token)
        .then((result) => {
          req.tokenInfo = result;
          if (result === false) {
            res.status(401).json({ message: 'Secret Token Invalid', authendication: 'Unauthorized' });
          } else {
            const decoded = Jwt.decode(result);
            req.userId = decoded?.sub;
            next();
          }
        })
        .catch((err) => {
          res.status(401).json({ error: 'Invalid token', details: err });
        });
    } else {
      res.status(401).json({ message: 'Token is required', authendication: 'Unauthorized' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { authMiddleware };


