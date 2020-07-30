const express = require('express');
const path = require('path');
const mysql = require('mysql');

const utils = require('./serverUtilities');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/allspells', (req, res) => {
  const queryString = 'SELECT * FROM spells'; // todo decide what to display from the database

  // create database connection
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DBASE,
    port: process.env.DB_PORT
  });

  // connect to database and perform query
  connection.connect(err => {
    if (err) {
      throw err;
    }
    connection.query(queryString, (err, result, fields) => {
      if (err) {
        throw err;
      }

      // here we need to handle what to do with the result from the query
      console.log(result);
      res.json(result);
    });
  });
});

app.get('/api/spellsearch', (req, res) => {
  // get the query parameters
  const queryObject = utils.processQuery(new URL(req.url, "https://dummyurl.com"));

  // create the query string
  const baseSQL = 'SELECT spell_name, short_description, spell_level, saving_throw, spell_resistance FROM spells';
  const SQLParams = utils.createSQLParameters(queryObject);

  console.log(SQLParams);

  // create database connection
  const connection = utils.createMySQLConnection();

  // connect to database and perform query
  connection.connect(err => {
    if (err) {
      throw err;
    }
    connection.query(baseSQL + SQLParams, (err, result, fields) => {
      if (err) {
        throw err;
      }

      // here we need to handle what to do with the result from the query
      console.log(result);
      res.json(result);
    });
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Spell server listening on ${port}`);