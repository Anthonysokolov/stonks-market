const User = require('./user')
const Trade = require('./trade')

User.hasMany(Trade)
Trade.belongsTo(User)

module.exports = {
  User,
  Trade
}
