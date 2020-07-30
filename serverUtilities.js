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
  mysql.createConnection({
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
    if (key === 'searchString') { // text user is searching for
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