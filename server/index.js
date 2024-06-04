const cors = require("cors");
const express = require("express");
require("dotenv").config();
const stripe = require("stripe")(process.env.REACT_APP_SECRET_KEY);
const uuid = require("uuid");
const app = express();
console.log(process.env.REACT_APP_SECRET_KEY);
// middleware
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("It really works");
});
app.post("/payment", (req, res) => {
  const { product, token } = req.body;
  console.log("product", product);
  console.log("price", product.price);
  //   create a unique idempontency key in case we don't double charge
  //   the user due to network issue
  const idempontencyKey = uuid.v4();

  //   create a customer using stripe.customers.create
  //   validate the token
  //   if validation done charge the user
  // stripe.charges.create({product_details}, {idempontencykey}
  //   customer related doc:https://docs.stripe.com/api/customers
  //   charge related doc: https://docs.stripe.com/api/charges/create
  return stripe.customers
    .create({
      email: token.email,
      id: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product?.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: product.name,
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});
// listen
app.listen(8000, () => console.log("listening at port 8000"));
