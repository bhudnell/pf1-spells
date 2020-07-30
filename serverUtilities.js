const mysql = require('mysql');

require('dotenv').config();

const classTypes = [
  "alchemist" ,
  "antipaladin",
  "arcanist",
  "bard",
  "bloodrager",
  "cleric",
  "druid",
  "hunter",
  "inquisitor",
  "investigator",
  "magus",
  "spell_medium",
  "mesmerist",
  "occultist",
  "oracle",
  "paladin",
  "psychic",
  "ranger",
  "shaman",
  "skald",
  "sorc",
  "spiritualist",
  "summoner",
  "summoner_unchained",
  "witch",
  "wiz"
];

const saveTypes = [
  "fortitude",
  "reflex",
  "will",
  "none"
];

const spellLevels = [
  "0th",
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th"
]

exports.createMySQLConnection = () => {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DBASE,
    port: process.env.DB_PORT
  })
}

exports.processQuery = url => {
  const processObject = {
    classes: [],
    saves: [],
    spellLevels: []
  };

  url.searchParams.forEach((value, key) => {  
    if (key === 'searchString' && value.length > 0) { // text user is searching for
      processObject.searchString = value;
    }
    else if (value === 'true') // only accept true values for now
    {
      if (key === 'spell_resistance') { // spell resistance toggle
        processObject.spellResistance = value;
      }
      else if (classTypes.includes(key)) { // this is a class type parameter
        processObject.classes.push(key);
      }
      else if (saveTypes.includes(key)) { // this is a save type parameter
        processObject.saves.push(key);
      }
      else if (spellLevels.includes(key)) { // this is a spell level parameter
        processObject.spellLevels.push(key);
      }
    }
  });

  return processObject;
}

exports.createSQLParameters = queryObject => {
  let SQLParams = ' WHERE';

  let firstCondition = true;
  Object.entries(queryObject).forEach(entry => {
    if (entry[1].length > 0) {
      if (!firstCondition) {
        SQLParams += ' AND';
      }
      firstCondition = false;
    }

    if (entry[0] === 'searchString') {
      SQLParams += ` spell_name LIKE '%${entry[1]}%'`
    }
    else if (entry[0] === 'spellResistance') {
      SQLParams += ` spell_resistance LIKE '%${entry[1]}%'`
    }
    else if (entry[0] === 'saves') {
      if (entry[1].length > 0) {
        SQLParams += ' (';

        let firstSave = true;
        entry[1].forEach(save => {
          if (!firstSave) {
            SQLParams += ' OR';
          }
          firstSave = false;

          SQLParams += ` saving_throw LIKE '%${save}%'`
        });

        SQLParams += ')';
      }
    }
    else if (entry[0] === 'classes') {
      
    }
    else if (entry[0] === 'spellLevels') {

    }
  });

  return SQLParams;
}