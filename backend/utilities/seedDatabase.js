const {User, Trade} = require("../database/models")

const syncTables = async () => {
  await User.sync({force:true})
  await Trade.sync({force:true})
}

const users = require('../data/users')
const trades = require('../data/trades')

const populateUsersTable = async (users) => {
  for(let i = 0; i < users.length; i++){
    let currentUser = await User.create(users[i])
  }
}

const populateTradesTable = async (trades) => {
  for(let i = 0; i < trades.length; i++){
    let currentTrade = await Trade.create(trades[i])
    currentTrade.userId = 1
    await currentTrade.save()
  }
}

const seedDatabase = async () => {
  try {
    await syncTables();
    await populateUsersTable(users);
    await populateTradesTable(trades);
    console.log("Successfully seeded!");
    process.exit(0);
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seedDatabase()
