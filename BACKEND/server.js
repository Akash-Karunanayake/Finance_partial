const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const expenseRoutes = require('./routes/expense');
const salaryRoutes = require('./routes/salary'); 

const Expense = require('./models/expense');
const Salary = require('./models/salary');

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

//const URL = process.env.MONGODB_URL;
const URL = `${process.env.MONGODB_URL1}/Finance`;

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connection Is Working...");
  })
  .catch((error) => {
    console.error("MongoDB Connection Is Not Working...", error);
  });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB Connected Successfully");
});

connection.on("error", (error) => {
  console.error("MongoDB Connection Failed!", error);
});

app.use('/expenses', expenseRoutes);
app.use('/salaries', salaryRoutes);

app.listen(PORT, () => {
  console.log(`Server started working on Port ${PORT}`);
});
