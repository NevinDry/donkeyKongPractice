var MongoDB = require("../db");
var usersCollection = "users";

module.exports.getOne = function (name) {
    return new Promise(function (resolve, reject) {
        MongoDB.OpenConnection(
            function (db, client) {
                db.collection(usersCollection).findOne({
                        name: name
                    }).then(function (doc) {
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

module.exports.getById = function (id) {
    return new Promise(function (resolve, reject) {
        MongoDB.OpenConnection(
            function (db, client) {
                db.collection(usersCollection).findById(id).then(function (user) {
                        client.close();
                        resolve(user);
                    })
                    .catch(function (err) {
                        client.close();
                        reject(err);
                    });
            });
    });
};


module.exports.getByEmail = function (email) {
    return new Promise(function (resolve, reject) {
        MongoDB.OpenConnection(
            function (db, client) {
                db.collection(usersCollection).findOne({
                        email: email
                    }).then(function (user) {
                        client.close();
                        resolve(user);
                    })
                    .catch(function (err) {
                        console.log(JSON.stringify(err));
                        console.log("&");
                        client.close();

                        reject(err);
                    });
            });
    });

};

module.exports.addUser = function (user) {
    return new Promise(function (resolve, reject) {
        MongoDB.OpenConnection(
            function (db, client) {
                db.collection(usersCollection).insert(user).then(function (doc) {
                        client.close();
                        resolve();
                    })
                    .catch(function (err) {
                        client.close();
                        reject(err);
                    });
            });
    });

};