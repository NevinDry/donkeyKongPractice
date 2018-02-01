var config = require('../config.json');
var express = require('express');
var router = express.Router();
 
// routes
router.get('/test', test);
 
module.exports = router;
 
function test(req, res) {
    console.log("coucou");
    // userService.getById(req.user.sub)
    //     .then(function (user) {
    //         if (user) {
    //             res.send(user);
    //         } else {
    //             res.sendStatus(404);
    //         }
    //     })
    //     .catch(function (err) {
    //         res.status(400).send(err);
    //     });
}