const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const dbconnect = require('./dbConfig/dbConfig');
dbconnect();

const Port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const authRoutes = require('./Routes/AuthRoutes');
app.use('/auth', authRoutes);

app.listen(Port, () => {
    console.log(`Server is running on: http://localhost:${Port}`);
});
