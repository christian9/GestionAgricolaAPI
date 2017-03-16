"use strict";
var azurestorage = require('azure-storage');
module.exports = TableController;
function TableController() {
    var accessKey = 'q8HLRWmCCS6aJY21UMkNa3AizywNgPFLrcg03o0UX1ZJeqmL4PvTjoLh5siaWIaNIcbwPl08h1KNavKMzi43Zg==';
    var storageAccount = 'gestionagricolastorage';
    var tableSvc = azurestorage.createTableService(storageAccount, accessKey, azurestorage.StorageHost);
    this.storageClient = tableSvc;
    this.bananaTable = 'Banano';
    this.variableTable = 'Variable';
    this.partitionKey = 'TravelNumber';
    this.storageClient.createTableIfNotExists(this.bananaTable, function tableCreated(error) {
        if (error) {
            console.log("Error accediendo la tabla: " + error);
            throw error; 
        }
    });
    this.storageClient.createTableIfNotExists(this.variableTable, function tableCreated(error) {
        if (error) {
            console.log("Error accediendo la tabla: " + error);
            throw error;
        }
    });
}
TableController.prototype = {
    getVariables: function (request, reply) {
        var inicio = new Date(2017, 1, 1);
        var query = new azurestorage.TableQuery()
            //.where('Time >= ?date?', inicio);
        this.storageClient.queryEntities(this.variableTable, query, null, function entitiesQueried(error, result) {
            //console.log("variables: "+result.entries)
            reply(result)
        });
    },
    getBananas: function (request, reply) {
        var inicio = new Date(2017, 1, 1);  
        var query = new azurestorage.TableQuery()
            //.where('Time >= ?date?', inicio);
        this.storageClient.queryEntities(this.bananaTable, query, null, function entitiesQueried(error, result) {
            //console.log("bananas: "+result.entries)
            reply(result)
        });
    }
} 
