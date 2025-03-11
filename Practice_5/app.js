const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./DbConfig/DbConfig");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api", require("./Routes/AuthRotes"));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
