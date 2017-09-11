'use strict';
const uuidV4 = require('uuid/v4');

module.exports = {
  transformDataToSequelizeFixture(modelName, records) {
    return records.map(record => ({ model: modelName, data: record }));
  },
  generateUUID() {
    return uuidV4();
  },
};
