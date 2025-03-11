const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./DbConfig/DbConfig");
const authRoutes = require("./Routes/AuthRotes");
require("dotenv").config();

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("User Authentication API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
