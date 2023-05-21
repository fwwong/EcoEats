const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    const currentUser = await User.findOne({
        username: req.session.user.username
    });

    res.render('/home', {
        user: currentUser
    });
});

router.post('/', async (req, res) => {
    const currentUser = await User.findOne({
        username: req.session.user.username
    });

    res.render('/home', {
        user: currentUser
    });
});


module.exports = router;