require("dotenv").config();
const express = require("express");
const helmet = require("helmet"); // adding headers
const cors = require("cors"); // Cros-Orign Resource sharing
const cookieParser = require("cookie-parser");
const compression = require("compression");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

require("./config/passport");

// routers
const authRouter = require("./routers/authRouter");

const connectDB = require("./db/connect");
const identifier = require("./middlewares/identification");
const app = express();

app.use(cors());
app.use(helmet());

app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create session

app.use(
  session({
    secret: process.env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/auth", authRouter);
app.get("/profile", (req, res) => {
  res.send("welcome in chefio");
});
app.get("/", (req, res) => {
  res.send(
    '<a href="http://localhost:3000/api/v1/auth/google">Authenticate with Google</a>'
  );
});
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is running on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();

module.exports = app;
