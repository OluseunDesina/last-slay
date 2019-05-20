// Import Dependies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const cors = require('cors');
const adminRoutes = require ('./routes/adminUser');
const categoryRoutes = require ('./routes/category');
const userRoutes = require ('./routes/users');
const professionalRoutes = require ('./routes/professionals');

// Importing Filesqq
const Admin = require("./models/admin"); //Model as Admin
const User = require("./models/users"); //Model as User
const Professional = require("./models/professionals"); //Model as Professional
const Category = require("./models/category"); //Model as Category

// Creating express router and app instances
const router = express.Router();
const app = express();


//Create a connection to the database
mongoose.connect(
    "mongodb+srv://noah:nickelodeon@codessy-rzcs2.mongodb.net/test?retryWrites=true", {useNewUrlParser: true, autoIndex: false}
  )
  .then(()=> {
    console.log("Connection to database Successfully!")
  })
  .catch(()=> {
    console.log("Connection Failed!");
  });

// Creating a connection to the front end development server
  app.use(cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    credentials: true
  }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", (req, res, next) => {
  res.status(201).json({
    message: "Hello World!!"
  })
})
//
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/professional", professionalRoutes);
app.use("/api/category", categoryRoutes);



module.exports = app;
