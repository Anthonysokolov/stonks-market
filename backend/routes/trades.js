const express = require('express')
const router = express.Router()
const {Trade} = require('../database/models')

router.get('/', function(req, res, next){
  Trade.findAll({where:{userId:req.user.id}})//req.user.id
    .then(user => res.json(user))
    .catch(next)
})


/*
router.get('/:id', function(req, res, next){
  Session.findByPk(req.params.id, {include:[Problem]})
    .then(session => {
      session.numClimbs = session.problems.length
      if(session.userId != req.user.id){
        return res.status(404)
      }
      return res.json(session)
    })
    .catch(err => res.status(404))
})
*/


router.post('/add', function(req, res, next){
  Trade.create({
    date:Date(),
    ticker:req.body.ticker,
    price:req.body.price,
    numShares:req.body.numShares,
    isBuy:1,
    userId:req.user.id
  })
    .then(obj => res.send(obj))
    .catch(err => res.send(err))
})


module.exports = router
