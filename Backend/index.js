const express = require('express');
const app = express();
const mongoDB = require("./database");

require('dotenv').config()

const port = 5000;
// const port = 5000;

mongoDB();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-with, Content-Type, Accept"
  );
  next();
    
  });

app.get('/', (req, res) =>{
    res.send("Hello World");
})
app.use(express.json())
app.use('/api',require("./Routes/CreateUser"))
app.use('/api',require("./Routes/DisplayData"))
app.use('/api',require("./Routes/OrderData"))

app.listen(port, ()=>{
    console.log(`example app listening on port ${port}`)
})
