'use strict';
module.exports = function(sequelize, DataTypes) {
  var Url = sequelize.define('Url', {
    ori_url: DataTypes.STRING,
    short_url: DataTypes.STRING,
    click_count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Url;
};