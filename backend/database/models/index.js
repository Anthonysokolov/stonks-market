const User = require('./user')
const Trades = require('./trades')

User.hasMany(Trades)
Trades.belongsTo(User)

module.exports = {
  User,
  Trades
}
