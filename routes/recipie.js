const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

router.get('/', (req, res) => {
    res.render('recipe');
});

router.post('/recipe/ingredients/add', (req, res) => {
    const indexArray = req.body.index;
    console.log(indexArray);
    res.render("recipe");

});

router.get('/recipe/ingredients/add', (req, res) => {
    res.render("recipe");
});





module.exports = router;