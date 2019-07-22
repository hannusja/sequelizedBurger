var express = require("express")
var PORT = process.env.PORT || 777
var app = express()
var db = require("./models")

app.use(express.static("public"))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

var exphbs = require("express-handlebars")

app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

var routes = require("./controllers/burger_controller.js")

app.use(routes)

db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT)
    })
})