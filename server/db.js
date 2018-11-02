/*
This module provides helper methods to allow the application to interact with a MongoDB database.
*/
var MongoClient = require("mongodb");
var config = require("./config.json");

var url = config.connectionString;

var MongoDB = {
	OpenConnection: function (onOpen) {
		//BDD initialize
		console.log('Connection to the db ...');
		MongoClient.connect(url, function (err, client) {
			
			if (err) {
				console.log(err);				
				return new Error("Error connecting to db");
			}
			else {
				console.log("Connected successfully !");
				onOpen(client.db('kong'), client);
			}
		});
	}
};

// Make the module available for use in other files
module.exports = MongoDB;