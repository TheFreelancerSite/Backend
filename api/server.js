const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const serviceRouter = require("./routes/service");
const userRouter = require("./routes/api/user.routes");
const conversationRouter=require("./routes/conversation")
const messageRouter =require('./routes/message')
const googleRouer = require("./routes/api/google.routes");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
require("dotenv").config();

const app = express();
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000'], 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));


const sessionSecret = process.env.SESSION_SECRET || "secret";

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
require("./controllers/google-auth")(passport);

app.use("/service", serviceRouter);
app.use("/user", userRouter);
app.use("/conversation",conversationRouter)
app.use("/message",messageRouter)
app.use("/", googleRouer);

app.listen(3000,()=>{
    console.log ("server lisnting ")
})
