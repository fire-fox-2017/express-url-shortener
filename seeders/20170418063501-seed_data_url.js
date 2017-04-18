'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Urls', [{
      url_list: 'http://stackoverflow.com/questions/tagged/node.js',
      click_count: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      url_list: 'https://docs.mongodb.org/getting-started/node/',
      click_count: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      url_list: 'http://expressjs.com/en/starter/basic-routing.html',
      click_count: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Person', null, {});

  }
};
