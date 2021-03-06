const Sequelize = require('sequelize')
const db = require('../db')

const Trade = db.define("trade",{
  date:{
    type: Sequelize.DATE,
    allowNull: false
  },
  ticker:{
    type: Sequelize.STRING,
  },
  price:{
    type: Sequelize.INTEGER
  },
  numShares:{
    type: Sequelize.INTEGER
  },
  isBuy:{
    type:Sequelize.BOOLEAN
  }
})

module.exports = Trade
