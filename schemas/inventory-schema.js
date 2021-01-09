const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const inventorySchema = mongoose.Schema({
  guildId: reqString,
  userId: reqString,
  item1: reqString,
  item1: reqString,
  item1: reqString,
  item1: reqString,
  item1: reqString,
  item1: reqString,
})

module.exports = mongoose.model('inventory', inventorySchema)