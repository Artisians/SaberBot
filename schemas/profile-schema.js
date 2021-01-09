const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}
const reqNumber = {
  type: Number,
  required: true,
}

const profileSchema = mongoose.Schema({
  guildId: reqString,
  userId: reqString,
  coins: reqNumber,
  level: reqNumber,
  xp: reqNumber,
  worked: reqNumber,
})

module.exports = mongoose.model('profiles', profileSchema)