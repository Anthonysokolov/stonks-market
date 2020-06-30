const express = require('express')
const router = express.Router()
const {User} = require('../database/models')

router.get("/balance", function(req, res, next){
  User.findAll({
        attributes:['balance'],
        where:{id:1}}) //req.user.id
    .then(user => res.json(user))
    .catch(err => next(err))
})

router.post("/deduct/:deductBy", function(req, res, next){
  User.findOne({
    attributes:['balance'],
    where:{id:req.user.id}})
  .then(user => {
    user.balance -= deductBy
    await user.save()
    return res.json(user)
  })
  .catch(err => next(err))
  let deductBy = req.params.deductBy
})
/*
router.get('/', function(req, res, next){
  User.findAll()
    .then(users => res.status(200).json(users))
    .catch(err => next(err))
})
/*
router.get('/:id/', function(req, res, next){
  User.findByPk(req.params.id)
    .then(user => res.json(user))
    .catch(next)
})

router.get('/:id/sessions', function(req, res, next){
  console.log(req.user.id)
  Session.findAll({where:{userId:req.params.id},include:[Problem]})
    .then(user => res.json(user))
    .catch(next)
})
*/
module.exports = router
