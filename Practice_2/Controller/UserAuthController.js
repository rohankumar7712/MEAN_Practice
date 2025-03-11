const path =require('path');

const user =require("../Model/UserModel");

exports.signup = async (req,res)=>{
    console.log(req.body) ;

    try{
        const { username, emailid, password } = req.body;

        if (username == " " || emailid == " " || password == " ") {
            console.log('All fields are required!');
            return res.status(400).send('All fields are required!');
        }

        const checkuser = await user.findOne({ emailid });
        console.log('User found:', checkuser);

        if (!checkuser) {
            // Create a new user
            const newuser = { username, emailid, password };
            const createdUser = await user.create(newuser);
      
            console.log('User created:', createdUser);
            res.status(201).json({
                message: 'User created successfully!',
                user: createdUser,
              });
            res.sendFile(path.join(__dirname, '..', 'pages', 'index.html'));
          } else {
            console.log('User already exists!');
            res.status(409).send('User already exists!');
          }


    }
    catch(err){
        console.log("Error:",err);
        res.status(500).send('An error occurred. Please try again.');
    }


}

exports.login = async (req,res)=>{
    console.log(req.body)   ;

    try{
        const { username, emailid, password } = req.body;

        if (emailid == " " || password == " ") {
            console.log('All fields are required!');
            return res.status(400).send('All fields are required!');
        }

        const checkuser = await user.findOne({ emailid });
        console.log('User found:', checkuser);

        if (checkuser) {
            res.sendFile(path.join(__dirname, '..', 'pages', 'dashboard.html'));
          } else {
            console.log('User does not exist!');
            res.sendFile(path.join(__dirname, '..', 'pages', 'index.html'));
          }
    }
    catch(err){
        console.log("Error:",err);
        res.status(500).send('An error occurred. Please try again.');
    }

}