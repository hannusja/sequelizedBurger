var express = require("express")
var db = require("../models")
var router = express.Router()

router.get("/", function(req, res) {
  db.Burger.findAll({}).then(function(data) {
    var hbsObject = {
      burgers: data
    }
    res.render("index", hbsObject)
  })
})

router.post("/api/burgers", function(req, res) {
  db.Burger.create({
    burger_name: req.body.burger_name,
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
    devoured: req.body.devoured
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

module.exports = router