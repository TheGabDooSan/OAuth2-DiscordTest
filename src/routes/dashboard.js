const express = require('express');
const router = express.Router();

function isAuthorized(req, res, next) {
    if(req.user) {
        console.log("User is logged in.");
        console.log(req.user);
        next();
    }
    else {
        console.log("USer is not logged in.");
        res.redirect('/');
    }
}

router.get('/', isAuthorized, (req, res) => {
    res.sendStatus(200);
});

module.exports = router;