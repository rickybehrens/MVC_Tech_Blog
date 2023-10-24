const path = require('path'); // Import the 'path' module for working with file paths.
const express = require('express'); // Import the 'express' framework.
const session = require('express-session'); // Import the 'express-session' middleware for handling sessions.
const exphbs = require('express-handlebars'); // Import the 'express-handlebars' template engine.
const SequelizeStore = require('connect-session-sequelize')(session.Store); // Import the 'connect-session-sequelize' module to store sessions in the Sequelize database.
const routes = require('./controllers'); // Import the defined routes.
const sequelize = require('./config/connection'); // Import the Sequelize connection.
const helpers = require('./utils/helpers'); // Import custom helper functions.

const app = express(); // Create an instance of the Express application.
const PORT = process.env.PORT || 3001; // Define the port for the server.

const sess = {
  secret: process.env.SESSION_SECRET, // Set the session secret.
  cookie: {
    maxAge: 300000, // 5 minutes in milliseconds (session expiration time).
  },
  resave: false, // Don't save the session if unmodified.
  saveUninitialized: true, // Save uninitialized sessions.
  store: new SequelizeStore({
    db: sequelize, // Connect session data to the Sequelize database.
  }),
};

app.use(session(sess)); // Use the session middleware with the specified configuration.

const hbs = exphbs.create({ helpers }); // Create an instance of Express Handlebars with custom helpers.

app.engine('handlebars', hbs.engine); // Set Handlebars as the template engine.
app.set('view engine', 'handlebars'); // Set Handlebars as the view engine.

app.use(express.json()); // Parse JSON request data.
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request data.
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory.

app.use(routes); // Use the defined routes.

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on PORT: ' + PORT));
});
