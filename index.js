const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("The server is running");
});

app.listen(port, () => {
  console.log(`The server is running on` + port);
});

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.rqebvmt.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const restaurantCollection = client
      .db("Checkout")
      .collection("restaurants");
    app.get("/allrestaurants", async (req, res) => {
      const query = {};
      const cursor = restaurantCollection.find(query);
      const restaurants = await cursor.toArray();
      res.send(restaurants);
    });
  } finally {
  }
}
run().catch(console.dir);
