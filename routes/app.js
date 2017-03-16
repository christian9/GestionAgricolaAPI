var Joi = require("joi");
var azure = require('azure');
var TableController=require('./../controllers/table');

var tableController = new TableController();

var routes =
   [
       {
           method: 'GET',
           path: '/bananas',
           config: {
               handler: tableController.getBananas.bind(tableController)
           }
       },
       {
           method: 'GET',
           path: '/variables',
           config: {
               handler: tableController.getVariables.bind(tableController)
           }
       }
    ];

module.exports.routes = function (server) {
    server.route(routes);
};
