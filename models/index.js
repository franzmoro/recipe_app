'use strict';
const Sequelize = require('sequelize');
const { join } = require('path');
const walkSync = require('walk-sync');

let db;
const initializeDB = config => {
  if (!db) {
    db = {};
    const sequelize = constructSequelize(config.connectionString);
    const modelFiles = walkSync(__dirname, { globs: ['**/*.sequelize.js'] });

    modelFiles.forEach(fileName => {
      const model = sequelize.import(join(__dirname, fileName));
      db[model.name] = model;
    });

    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    db.sequelize = sequelize;
  }
  return db;
};

const constructSequelize = connectionString => {
  return new Sequelize(connectionString, {
    benchmark: true,
    define: {
      underscored: true,
      underscoredAll: true
    }
  });
};

module.exports = { db, initializeDB };
