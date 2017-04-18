'use strict';
var helper = require("../helpers/app");

module.exports = function(sequelize, DataTypes) {
  var Url = sequelize.define('Url', {
    link: DataTypes.STRING,
    short_link: DataTypes.STRING,
    click_count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    hooks: {
      beforeCreate: (url) => {
        url.short_link = helper.randomString();
        url.click_count = 0;
        console.log(`**** beforeCreate url.short_link='${url.short_link}'`)

        // return helper.randomString(url.link).then ( random_str => {
        //   url.short_link = random_str
        //   // cb(null, options);
        // })
      }
    }
  });
  return Url;
};
