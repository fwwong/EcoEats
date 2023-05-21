const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
const User = require("../models/users");
const session = require('express-session');
const { Configuration, OpenAIApi } = require('openai');
const { appendFile } = require("fs");
const { send } = require("process");

dotenv.config();

const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION_KEY,
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function callOpenAIAPi(userPrompt) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${userPrompt}`,
        temperature: 0,
        max_tokens: 1000,
    });
    const responseData = response.data.choices[0].text;
    console.log(responseData);
    return responseData;
}

let categories = [];
let diets = [];
let ingredientList = [];
let recipes = [];
let sustainability = "";

router.use('/recipe-generator', async (req, res, next) => {
    req.session.recipes = recipes;
    req.session.categories = categories;
    req.session.diets = diets;
    req.session.ingredientList = ingredientList;
    req.session.sustainability = sustainability;
    next();
});

router.get('/recipe-generator', (req, res) => {
    res.render("recipeGenerator", {
        recipes: recipes,
        ingredients: ingredientList,
        categories: categories,
        diets: diets,
        sustainability: sustainability,
    });
});

router.post('/recipe-generator/add-ingredients', async (req, res) => {
    const ingredient = req.body.ingredient;
    ingredientList.push(ingredient);

    const ingredients = ingredientList.join(', ');

    const sustainablePrompt = `Are the following ingredients considered sustainable? ${ingredients}`;
    console.log(sustainablePrompt);

    let responseData = await callOpenAIAPi(sustainablePrompt);
    responseData = responseData.replaceAll("\n", "<br>")
    console.log(responseData);

    sustainability = responseData;

    res.render("recipeGenerator", {
        recipes: recipes,
        ingredients: ingredientList,
        categories: categories,
        diets: diets,
        sustainability: sustainability,
    });
});

router.post('/recipe-generator/delete-ingredients', (req, res) => {
    const { index } = req.body;
    if (index >= 0 && index < ingredientList.length) {
        ingredientList.splice(index, 1);
        console.log(ingredientList);
        res.render("recipeGenerator", {
            recipes: recipes,
            ingredients: ingredientList,
            categories: categories,
            diets: diets,
            sustainability: sustainability,
        })
    } else {
        res.status(400).send('Invalid index'); // Send an error response to the client
    }
});

router.post('/recipe-generator', async (req, res) => {
    const category = categories.join(', ') || "";
    const diet = diets.join(', ') || "";
    const ingredients = ingredientList.join(', ');

    const recipePrompt = `Generate top 3 ${diet} ${category} recipes that contains ${ingredients} in a general recipe format.`;
    console.log(recipePrompt);

    let responseData = await callOpenAIAPi(recipePrompt);
    responseData = responseData.replaceAll("\n", "<br>")
    console.log(responseData);

    recipes = [];

    recipes.push(
        responseData
        // if successfully parsed
        // {
        //     recipeName: responseData,
        //     recipeDetails: responseData
        // }
    );

    console.log(recipes);

    res.render("recipeGenerator", {
        recipes: recipes,
        ingredients: ingredientList,
        categories: categories,
        diets: diets,
        sustainability: sustainability,
    });
});

module.exports = router;