const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: '/forbidden'
}), (req, res) => {
    res.send(req.user);
});

module.exports = router;