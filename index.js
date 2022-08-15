const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



app.get('/', function (req, res) {
    res.send("running my own node server")
  })
  
app.listen(port, ()=> {
    console.log(`server is running in port,${port}`)
  })