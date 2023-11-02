const express = require('express')
const cors = require('cors')
// const routes = require("./routes/index")
const serviceRouter = require("./routes/service");

require('dotenv').config();


const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/service",serviceRouter)
// app.use(routes);



app.listen(3000 ,()=>{
    console.log ("server lisnting ")
})