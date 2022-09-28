'use strict';

const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  try {

    //   if (!req.headers.authorization) { 
    //     next('Invalid Login');
    // }
    let authHeader = req.headers.authorization.split(' '); // ['Bearer', "<JSON_WEB_TOKEN>"]
    let token = authHeader[1];

    // const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateWithToken(token);
    if (validUser) {
      req.user = validUser;
      req.token = validUser.token;
      next();
    } else {
      next('Invalid Token');
    }

  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
};
