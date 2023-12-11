// bdtoufiqtech
// 1reUrzoxMWHylE1Z
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const multer = require("multer");

// Set up multer for handling file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
require("dotenv").config();

// mongoDb connect
// const uri = process.env.MONGODB_URI;
const uri =
  "mongodb+srv://bdtoufiqtech:1reUrzoxMWHylE1Z@cluster0.gnhqmfx.mongodb.net/?retryWrites=true&w=majority";

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("membersList");
    const membersCollection = database.collection("membersInfo");

    // create get req2222
    app.get("/members", async (req, res) => {
      const cursor = membersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // create unique data req33333333333333333
    app.get("/members/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await membersCollection.findOne(query);
      res.send(result);
    });

    // create post req111111111
    app.post("/members", async (req, res) => {
      const member = req.body;
      console.log(member);
      const result = await membersCollection.insertOne(member);
      res.send(result);
    });

    // create field update4444444
    app.put("/members/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const member = req.body;
      const options = { upsert: true };

      const memberUpdate = {
        $set: {
          name: member.name,
          email: member.email,
          roles: member.roles,
          ratings: member.ratings,
          FBlink: member.FBlink,
        },
      };
      const result = await membersCollection.updateOne(
        filter,
        memberUpdate,
        options
      );
      res.send(result);
    });

    // delete operation5555555555555555
    app.delete("/members/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await membersCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);

//---------------------------------
app.get("/", (req, res) => {
  res.send("Team Member Crud App Running");
});

app.listen(port, () => {
  console.log("App running on port ", port);
});
