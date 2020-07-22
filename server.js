const express = require('express');
const path = require('path');
const url = require('url');
const mysql = require('mysql');

require('dotenv').config();

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/spells', (req, res) => {
  // get the query parameters
  const queryObject = url.parse(req.url,true).query;

  // create the query string
  let queryString = 'SELECT * FROM spells WHERE';
  let firstCondition = true;

  Object.entries(queryObject).forEach(entry => {
    console.log(entry);

    if (entry[0] === 'searchString')
    {
      console.log(`search string is: ${entry[1]}`);

      firstCondition = false;
      queryString.concat(` ${entry[0]} LIKE '%${entry[1]}%'`); // probably shouldnt be entry[0], probably only spell name? or maybe description too?
    }
    else if (entry[1] === 'true') {
      console.log(`parameter is accepted: ${entry[0]}`);

      if (!firstCondition) {
        firstCondition = false;
        queryString.concat(` AND`);
      }

      queryString.concat(` ${entry[0]} = TRUE`); // todo check this condition
    }
    else {
      console.log(`parameter is rejected: ${entry[0]}`);
    }
  });

  // queryObject should be an object of a list of params and values
  // ie: { sorcerer: false, cleric: true, 0th: true, fortSave: true }
  
  // create a sql query to return the spells database, potentially
  // modified with the params? (or maybe one api to access all, one
  // to handle a search request)

  // create database connection
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "main",
  });

  // connect to database and perform query
  connection.connect(err => {
    if (err) {
      throw err;
    }
    // fix this to use the created query
    connection.query(queryString, (err, result, fields) => {
      if (err) {
        throw err;
      }

      // here we need to handle what to do with the result from the query
      console.log(result);
    });
  });

  // Return them as json? (idk if this is the best way or not)
  // maybe goes in the above con.query
  res.json(result);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Spell server listening on ${port}`);