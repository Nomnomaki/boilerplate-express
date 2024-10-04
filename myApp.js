let express = require("express");
const { log } = require("fcc-express-bground");
let app = express();
require("dotenv").config();
console.log("Hello World");
absolutePath = __dirname + "/views/index.html";

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
// app.get("/", (req, res) => {
//   res.send("Hello Express");
// });

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  const messageStyle = process.env.MESSAGE_STYLE;

  if (messageStyle && messageStyle.toLowerCase() == "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

// app.get("/middleware", function (req, res, next) {
//   console.log("I'm a middleware...");
//   next();
// });

module.exports = app;
