const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

module.exports = app;
