'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { 
    return _authError(); 
  }
  try {
  let [basic, encodedString] = req.headers.authorization.split(' ');
  let [username, pass] = base64.decode(encodedString).split(':');

  
    req.user = await users.authenticateBasic(username, pass);
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

};

