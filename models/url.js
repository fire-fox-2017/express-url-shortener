'use strict';
module.exports = function(sequelize, DataTypes) {
  var Url = sequelize.define('Url', {
    url_name: DataTypes.STRING,
    short_url: DataTypes.STRING,
    counter: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    hooks: {
      beforeCreate: function(user, options) {
        let string = '';
        for(let i = 0; i < 5; i++) {
          string += String.fromCharCode(Math.floor((Math.random() * (122 - 65 + 1)) + 65));
        }
        user.short_url = `null://${string}`;
      }
    }
  });
  return Url;
};