const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const EmpRouter = require("./Route/empRoute/empRoute");
app.use("/", EmpRouter)

app.listen(5001, ()=>{
    console.log("server running on port 5001")
}) 