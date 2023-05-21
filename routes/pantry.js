const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
const User = require("../models/users");
const Pantry = require("../models/pantry");
const session = require('express-session');

router.get('/pantry', async (req, res) => {
    const currentUser = await User.findOne({
        username: req.session.user.username
    });
    const userId = currentUser._id;

    const pantry = await Pantry.find({ userId: userId });

    res.render("pantry", {
        pantry: pantry,
        today: Date.now(),
    });
});

router.post('/pantry/add', async (req, res) => {
    const currentUser = await User.findOne({
        username: req.session.user.username
    });
    const userId = currentUser._id;
    const pantryName = req.body.pantry;
    const expiry = req.body.expiry;
    const quantity = req.body.quantity;

    await Pantry.create({
        userId: userId,
        date: Date.now(),
        pantry: pantryName,
        expiry: expiry,
        quantity: quantity,
    });

    const pantry = await Pantry.find({ userId: userId });

    res.render("pantry", {
        pantry: pantry,
        today: Date.now(),
    });
});

router.post('/pantry/delete', async (req, res) => {
    const pantryId = req.body.delete;
    await Pantry.deleteOne({ _id: pantryId });

    const currentUser = await User.findOne({
        username: req.session.user.username
    });
    const userId = currentUser._id;
    const pantry = await Pantry.find({ userId: userId });

    res.render("pantry", {
        pantry: pantry,
        today: Date.now(),
    });
});

module.exports = router;