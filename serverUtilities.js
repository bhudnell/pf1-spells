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
  "medium",
  "mesmerist",
  "occultist",
  "oracle",
  "paladin",
  "psychic",
  "ranger",
  "shaman",
  "skald",
  "sorcerer",
  "spiritualist",
  "summoner",
  "summoner_unchained",
  "witch",
  "wizard"
];

const saveTypes = [
  "fortitude",
  "reflex",
  "will",
  "none"
];

const spellLevelTypes = {
  "0th": 0,
  "1st": 1,
  "2nd": 2,
  "3rd": 3,
  "4th": 4,
  "5th": 5,
  "6th": 6,
  "7th": 7,
  "8th": 8,
  "9th": 9
}

exports.createMySQLConnection = () => {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DBASE,
    // @ts-ignore
    port: process.env.DB_PORT
  })
}

exports.processQuery = url => {
  const processObject = {
    searchString: '',
    spellResistance: '',
    classes: [],
    saves: [],
    spellLevels: []
  };

  url.searchParams.forEach((value, key) => {
    if (key === 'searchString' && value.length > 0) { // text user is searching for
      processObject.searchString = value;
    }
    else if (key === 'spellResistance' && value.length > 0) { // spell resistance (yes, no, either)
      if (value === 'true') {
        processObject.spellResistance = 'yes';
      }
      else if (value === 'false') {
        processObject.spellResistance = 'no';
      }
    }
    else if (value === 'true') // only accept true values for now
    {
      if (classTypes.includes(key)) { // this is a class type parameter
        let newKey = key;
        if (key === 'arcanist') {
          newKey = 'wiz';
        } // arcanist is treated the same as wizard in the database
        else if (key === 'wizard') {
          newKey = 'wiz'; // rename to match database names
        }
        else if (key === 'sorcerer') {
          newKey = 'sor'; // rename to match database names
        }
        else if (key === 'medium') {
          newKey = 'spell_medium'; // rename to match database names
        }
        processObject.classes.push(newKey);
      }
      else if (saveTypes.includes(key)) { // this is a save type parameter
        processObject.saves.push(key);
      }
      else if (Object.keys(spellLevelTypes).includes(key)) { // this is a spell level parameter
        processObject.spellLevels.push(spellLevelTypes[key]);
      }
    }
  });

  return processObject;
}

exports.createSQLParameters = queryObject => {
  // function to determine if queryObject is empty
  const isObjectEmpty = myObject => {
    const values = Object.values(myObject);
    for (let i = 0; i < values.length; i++) {
      if (values[i].length > 0) {
        return false;
      }
    }
    return true;
  }

  // if the queryObject is empty, return
  if (isObjectEmpty(queryObject)) {
    return '';
  }

  let SQLParams = ' WHERE';
  let firstCondition = true;

  // search string
  if (queryObject.searchString.length > 0) {
    SQLParams += ` spell_name LIKE '%${queryObject.searchString}%'`;

    firstCondition = false;
  }

  // spell resistance
  if (queryObject.spellResistance.length > 0) {
    if (!firstCondition) {
      SQLParams += ' AND ';
    }

    SQLParams += ` spell_resistance LIKE '%${queryObject.spellResistance}%'`;
    firstCondition = false;
  }

  // saves
  if(queryObject.saves.length > 0) {
    if (!firstCondition) {
      SQLParams += ' AND ';
    }

    SQLParams += ' (';
    let firstSave = true;

    queryObject.saves.forEach(save => {
      if (!firstSave) {
        SQLParams += ' OR';
      }
      firstSave = false;

      SQLParams += ` saving_throw LIKE '%${save}%'`
    });

    SQLParams += ')';

    firstCondition = false;
  }

  // classes and spell levels
  if (queryObject.classes.length > 0 || queryObject.spellLevels.length > 0) {
    if (!firstCondition) {
      SQLParams += ' AND ';
    }

    if (queryObject.spellLevels.length === 0) { // only classes
      SQLParams += ' (';
      let firstClass = true;

      queryObject.classes.forEach(myClass => {
        if (!firstClass) {
          SQLParams += ' OR';
        }
        firstClass = false;

        SQLParams += ` ${myClass} IS NOT NULL`
      });

      SQLParams += ')';
    }
    else if (queryObject.classes.length === 0) { // only spell levels
      SQLParams += ' (';
      let firstLevel = true;

      queryObject.spellLevels.forEach(spellLevel => {
        if (!firstLevel) {
          SQLParams += ' OR';
        }
        firstLevel = false;

        SQLParams += ` spell_level LIKE '%${spellLevel}%'`
      });

      SQLParams += ')';
    }
    else { // both classes and spell levels
      SQLParams += ' (';
      let firstParam = true;

      queryObject.classes.forEach(myClass => {
        if (!firstParam) {
          SQLParams += ' OR';
        }
        firstParam = false;

        SQLParams += ` ${myClass} IN (`

        let firstLevel = true;
        queryObject.spellLevels.forEach(spellLevel => {
          if (!firstLevel) {
            SQLParams += ',';
          }
          firstLevel = false;

          SQLParams += spellLevel;
        });

        SQLParams += ')'
      });

      SQLParams += ')';
    }
  }

  return SQLParams;
}