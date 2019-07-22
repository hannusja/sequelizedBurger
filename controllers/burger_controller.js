var express = require("express")
var db = require("../models")
var router = express.Router()

router.get("*", function(req, res) {
  db.Burger.findAll({
    include: [{
      model: db.Cook},{
      model: db.Customer}
    ],
    order: [
    ['burger_name', 'ASC']
  ]}).then(function(data) {
    var hbsObject = {
      burgers: data
    }
    res.render("index", hbsObject)
  })
})

router.post("/api/burgers", function(req, res) {
  db.Burger.create({
    burger_name: req.body.burger_name,
    CookId: req.body.CookId,
    devoured: false
  }).then(function(data) {
    res.json(data)
  })
  .catch(function(err) {
    res.json(err)
  })
})
  
router.put("/api/burgers/:id", function(req, res) {
  db.Burger.update({
    devoured: req.body.devoured,
    CustomerId: req.body.CustomerId,
  }, {
    where: {
      id: req.body.id
    }
  }).then(function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end()
    } else {
      res.status(200).end()
    }
  })
})

router.post("/api/cooks", function(req, res) {
  db.Cook.findOrCreate({
    where: {
      cook_name: req.body.cook_name
    },
    defaults: {
      cook_name: req.body.cook_name
    }
  }).then(function(data) {
    res.json(data)
  })
  .catch(function(err) {
    res.json(err)
  })
})

router.post("/api/customers", function(req, res) {
  db.Customer.findOrCreate({
    where: {
      customer_name: req.body.customer_name
    },
    defaults: {
      customer_name: req.body.customer_name
    } 
  }).then(function(data) {
    res.json(data)
  })
  .catch(function(err) {
    res.json(err)
  })
})

module.exports = router