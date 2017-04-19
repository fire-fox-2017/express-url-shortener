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
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(let i = 0; i < 5; i++) {
          string += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        user.short_url = `url.s/${string}`;
      }
    }
  });
  return Url;
};