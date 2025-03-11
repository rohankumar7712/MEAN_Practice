const express =require(`express`)
const app =express();

const path = require('path'); 
const user =require("./model/user");

const dbconnect=require('./dbConfig/dbConfig');
dbconnect();

require('dotenv').config();
const Port=process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));




app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages','index.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages','index.html'));
  });

app.get('/aboutus', (req, res) => {
   res.sendFile(path.join(__dirname, 'pages','aboutus.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages','contact.html'));
});

app.get('/product', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages','product.html'));
});

app.get('/srvices', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages','services.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages','signup.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages','login.html'));
});

app.post('/signup', async (req, res) => {
  console.log('Body:', req.body);
  // console.log('Form Data:', req.body);

  try {
    const { username, emailid, password } = req.body;

    // Validate input
    if (username == '' || emailid =='' || password == ' ') {
      console.log('All fields are required!');
      return res.status(400).send('All fields are required!');
    }

    // Check if user already exists
    const checkuser = await user.findOne({ emailid: emailid }); // Use `findOne` instead of `find`
    console.log('User found:', checkuser);

    if (!checkuser) {
      // Create a new user
      const newuser = { username, emailid, password };
      const createdUser = await user.create(newuser);

      console.log('User created:', createdUser);
      res.sendFile(path.join(__dirname, 'pages', 'index.html'));
    } else {
      console.log('User already exists!');
      res.status(409).send('User already exists!');
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('An error occurred. Please try again.');
  }
});


app.post('/login', async (req, res) => {
  console.log('Body:', req.body);
  // console.log('Form Data:', req.body);

  try {
    const {emailid, password } = req.body;

    // Validate input
    if (emailid =='' || password == ' ') {
      console.log('All fields are required!');
      return res.status(400).send('All fields are required!');
    }

    // Check if user already exists
    const checkuser = await user.findOne({ emailid: emailid }); // Use `findOne` instead of `find`
    console.log('User found:', checkuser);

    if (checkuser) {
      res.sendFile(path.join(__dirname, 'pages', 'dashboard.html'));

    } else {
      console.log('User does not  exists!');
      res.sendFile(path.join(__dirname, 'pages', 'index.html'));
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('An error occurred. Please try again.');
  }
});

app.listen(Port,()=>{
  console.log(`Server is running on:http://localhost:${Port}`);
})