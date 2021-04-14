var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
var cors = require("cors");

var indexRouter = require("./routes/index");
var ownerRouter = require("./routes/owner");
var realtorRouter = require("./routes/realtor");
var houseRouter = require("./routes/house");
var slotRouter = require("./routes/slot");
var visitationRouter = require("./routes/visitation");

mongoose.connect(
  "mongodb+srv://himanshu_raa:qltqP9Oh@strapi-database.p4x6r.mongodb.net/house-management?retryWrites=true&w=majority",
  {
    useNewUrlParser: "true",
    useUnifiedTopology: true,
  }
);
mongoose.connection.on("error", (err) => {
  console.log("err", err);
});
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
// app.set('view engine', 'jade');

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/owner", ownerRouter);
app.use("/realtor", realtorRouter);
app.use("/house", houseRouter);
app.use("/slot", slotRouter);
app.use("/visitation", visitationRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port = Number(process.env.PORT) || 8000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
