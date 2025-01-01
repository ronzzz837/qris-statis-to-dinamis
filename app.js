const express = require("express");
const createError = require("http-errors");
const cors = require("cors");
const secure = require("ssl-express-www");
const cookieParser = require("cookie-parser");

const api = require("./api");

const app = express();

app.set("trust proxy", true);
app.set("json spaces", 2);
app.use(cors());
app.use(secure);
app.use(cookieParser());
app.use("/", api);

/*app.use(function (req, res, next) {
  next(createError(404))
});*/

app.use(function (err, req, res, next) {
  res.json({
    status: false,
    creator: "Ronzz YT",
    message: "No akses!!!"
  });
});

app.listen(3000, () => {
  console.log("Aktif!")
});

module.exports = app
