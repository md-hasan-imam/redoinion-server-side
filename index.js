const express = require('express');
const cors = require("cors");
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.petxb8a.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log(uri);
console.log(uri);


async function run() {
    try {
        await client.connect();

      const menuItemsCollection = client.db("redonion").collection('menuitems');

      // loading all menu items in menu page
      app.get('/menuitems',async(req, res)=>{
        const menuitems = await menuItemsCollection.find().toArray();
        res.send(menuitems);
      })

      // loading single menu item in checkout page
      app.get('/checkout/:id',async(req, res)=>{
        console.log(req.params);
        const id = req.params;
        const query = { _id:ObjectId(id)};
        const menuItem = await menuItemsCollection.findOne(query);
        res.send(menuItem);
      })



    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);




app.get('/', function (req, res) {
    res.send("running my own node server")
  })
  
app.listen(port, ()=> {
    console.log(`server is running in port,${port}`)
  })