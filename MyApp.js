let express = require('express');
let app = express();
var absolutePath = __dirname + "/views/index.html";
var assetsPath = __dirname + "/public";
let response = "Hello json";

var bodyParser = require("body-parser");

app.use(function (req, res, next){
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();

});

app.get("/", function(req, res) {res.sendFile( absolutePath );})

app.get("/json", function(req, res) {if (process.env['MESSAGE_STYLE'] == "uppercase") {response = response.toUpperCase();} res.json({"message": response});})

app.get("/now", function(req, res, next) {
  req.time = new Date().toString();
  next();
},function(req, res){
  res.send({
    time: req.time
  
  });
});

app.use("/public", express.static(assetsPath));

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });

});
app.get("/name", (req, res) => {
   var { first: firstName, last: lastName } = req.query;
  res.json({
    name: `${firstName} ${lastName}`  
  })
})

app.use(bodyParser.urlencoded({extended: false}));

app.post('/name', (req, res) => {
  let name = req.body.first + ' ' + req.body.last;
  res.json({name: name});
});






























 module.exports = app;
