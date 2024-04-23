const express = require('express');

const EmpRouter = express.Router();

const {getData, postData,deleteData,updateData} = require("../../Controller/empController/empController")

EmpRouter.get("/getdata", getData)
EmpRouter.post("/savedata",postData )
EmpRouter.delete("/deletedata/:id", deleteData)
EmpRouter.put("/updatedata/:id",updateData)

module.exports = EmpRouter