const express = require('express');
const app = express();

const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const dbconnect = require('./dbConfig/UserDbConfig');
dbconnect();

const Port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pageRoutes = require('./Routes/PagesRoutes');
const authRoutes = require('./Routes/UserAuthRoutes');

app.use('/', pageRoutes);
app.use('/auth', authRoutes);

app.listen(Port, () => {
    console.log(`Server is running on: http://localhost:${Port}`);
  });