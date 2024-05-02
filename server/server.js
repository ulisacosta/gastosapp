require("dotenv").config();
const express = require("express");
const app = express();

const routes = require('./routes/index')
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


const port = process.env.PORT || 3001;

//setting
app.set("port", port);

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.disable("x-powered-by");

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());



app.use(function (req, res, next) {
  if (!req.user)
    res.header("Cache-Control", "private,no-cache,no-store,must-revalidate");
  next();
});

app.use("/", routes);

// Starting the server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
