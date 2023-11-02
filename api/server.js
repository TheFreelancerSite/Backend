const express = require('express')
const cors = require('cors')


require('dotenv').config();

const routes = require("./routes/index")
const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(routes);
app.listen(3000 ,()=>{
    console.log ("server lisnting ")
})