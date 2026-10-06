const express = require("express");
const cors = require("cors");
require("dotenv").config();


const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Student Management System API is running"
    });
});

app.use("/api/students", studentRoutes);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});