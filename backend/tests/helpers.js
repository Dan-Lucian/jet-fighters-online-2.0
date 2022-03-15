const mongoose = require('mongoose');

const copyObj = (object) => JSON.parse(JSON.stringify(object));

const getANonExistingId = async () => mongoose.Types.ObjectId().toString();

module.exports = {
  copyObj,
  getANonExistingId,
};
