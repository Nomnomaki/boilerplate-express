let express = require("express");
const { log } = require("fcc-express-bground");
let app = express();
require("dotenv").config();
let bodyParser = require("body-parser");
console.log("Hello World");
absolutePath = __dirname + "/views/index.html";

// Middleware to handle URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/", (req, res) => {
  res.sendFile(absolutePath);
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word,
  });
});

// app.get("/", (req, res) => {
//   res.send("Hello Express");
// });

app.get("/name", (req, res) => {
  var firstName = req.query.first;
  var lastName = req.query.last;
  var { first: firstName, last: lastName } = req.query;
  res.json({
    name: `${firstName} ${lastName}`,
  });
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  const messageStyle = process.env.MESSAGE_STYLE;

  if (messageStyle && messageStyle.toLowerCase() == "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

app.post("/name", function (req, res) {
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});
// app.get("/middleware", function (req, res, next) {
//   console.log("I'm a middleware...");
//   next();
// });

module.exports = app;
