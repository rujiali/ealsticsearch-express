var fs, configurationFile;

configurationFile = 'configuration.json';
fs = require('fs');

var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
);

var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');

/**
 * Authenticate client
 */
function authenticate(username, password) {
  if (username && password) {
    var users = configuration.users;
    var x;
    for (x in users) {
      var user = users[x];
      if (user.username == username) {
        if (user.password == password) {
          var expires = 86400;
          // if user is found and password is right
          // create a token
          var token = jwt.sign({
            iss: user.username,
          }, 'my secret');

          // return the information including token as JSON
          return {
            success: true,
            message: 'Enjoy your token!',
            token: token
          };
        } else {
          return { success: false, message: 'Authentication failed. Wrong password.' };
        }
      }
    }
    return { success: false, message: 'Authentication failed. User not found.' };
  } else {
    return { success: false, message: 'No username or password passed.' };
  }
}
exports.authenticate = authenticate;
