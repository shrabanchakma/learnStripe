const cors = require("cors");
const express = require("express");
require("dotenv").config();
const stripe = require("stripe")(process.env.PK_STRIPE);
const uuid = require("uuid");
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("It really works");
});

// listen
app.listen(8000, () => console.log("listening at port 8000"));
