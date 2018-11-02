var config = require('../config.json');
var MongoDB = require("../db");
var gamesCollection = "games";

module.exports.create = function (game) {
    return new Promise(function (resolve, reject) {
        MongoDB.OpenConnection(
            function (db, client) {
                db.collection(gamesCollection).insert(game).then(function (doc) {
                        client.close();
                        resolve(doc);
                    })
                    .catch(function (err) {
                        client.close();
                        reject(err);
                    });
            });
    });
};

module.exports.getAll = function (game) {
    return new Promise(function (resolve, reject) {
        MongoDB.OpenConnection(
            function (db, client) {
                db.collection(gamesCollection).find().toArray(function (err, result) {
                    client.close();
                    if (err) throw err;
                    resolve(result);
                });
            });
    });
};