'use strict';
module.exports = function(sequelize, DataTypes) {
  var Shortener = sequelize.define('Shortener', {
    originalLink: DataTypes.STRING,
    shortLink: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    hooks:{
      beforeCreate: function(model){
        let str = ''
        let possible = 'ABCDEFGHIIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstu'
        for(let i=0; i<7; i++){
          str+=possible.charAt(Math.floor(Math.random()*possible.length))
        }
        model.shortLink = str;
      }
    }
  });
  return Shortener;
};