const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const moment = require("moment-timezone");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// app.use(cookieParser());

require("dotenv").config();

const testRoutes = require("./routes/test.route");
const authRoutes = require("./routes/local.strategy.route");
const secureRoutes = require("./routes/secure.route");
const validateAddressRoutes = require("./routes/validate-address.routes");
const productRoutes = require("./routes/product.route");

const PORT = process.env.PORT || 8000;
const BASE_URL = process.env.BASE_URL;


mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to DB success");
  })
  .catch((error) => console.error(`DB Connection Error: ${error}`));

var conn = mongoose.connection;

conn.on("connected", function () {
  console.log("database is connected successfully");
});
conn.on("disconnected", function () {
  console.log("database is disconnected successfully");
});
conn.on("error", console.error.bind(console, "connection error:"));

morgan.token("date", (req, res, tz) => {
  return moment().tz("Europe/Kiev").format("YYYY-MM-DD, HH:mm:ss");
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :remote-addr :date"
  )
);

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({ origin: process.env.DEVELOPMENT_CLIENT_URL, credentials: true })
  );
}

// parse cookies
app.use(cookieParser());

app.use(passport.initialize());

app.use(`/${BASE_URL}/test`, testRoutes);
app.use(`/${BASE_URL}/auth`, authRoutes);
app.use(`/${BASE_URL}/shipping`, validateAddressRoutes);
app.use(`/${BASE_URL}/products`, productRoutes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
// app.use('/user', passport.authenticate('jwt', { session: false }), secureRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
