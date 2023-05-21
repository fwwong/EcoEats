const express = require("express"); 
const app = express();
const database = require("./src/database"); // Database Connection
const sessionConfig = require("./src/session"); // Session Configuration
const authRoutes = require("./routes/auth"); // includes login, signup, logout, password reset, index, and home
const recipeRoutes = require("./routes/recipeGenerator"); // includes recipe generator


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(sessionConfig);
app.use(express.static('public'));


// Routes
app.use("/", authRoutes);
app.use("/", recipeRoutes);


// Database & Port Connection
database.connect();

app.listen(process.env.PORT || 4000, () => {
    console.log('Server is running on port 4000');
});

// Serve CSS files from the "public/css" directory


// Serve JS files from the "public/js" directory
app.use(express.static(__dirname + "/"));

//404 page not found 
app.get("*", (req, res) => {
    res.send("404 Page Not Found");
});

app.post("/404", (req, res) => {
    res.status(404).redirect("/");
});

module.exports = app;