const user = require("../Models/UserModel");

exports.signup = async (req, res) => {
    console.log(req.body);
    try {
        const { username, emailid, password } = req.body;

        if (!username || !emailid || !password) {
            console.log('All fields are required!');
            return res.status(400).json({ error: 'All fields are required!' });
        }

        const checkuser = await user.findOne({ emailid });
        console.log('User found:', checkuser);

        if (!checkuser) {
            const newuser = { username, emailid, password };
            const createdUser = await user.create(newuser);
            console.log('User created:', createdUser);
            return res.status(201).json({
                message: 'User created successfully!',
                user: createdUser
            });
        } else {
            console.log('User already exists!');
            return res.status(409).json({ error: 'User already exists!' });
        }

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ error: 'An error occurred. Please try again.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { emailid, password } = req.body;
        const checkuser = await user.findOne({ emailid });

        if (!checkuser) {
            return res.status(404).json({ error: 'User does not exist!' });
        }

        if (checkuser.password !== password) {
            return res.status(401).json({ error: 'Invalid password!' });
        }

        res.status(200).json({
            message: 'Login successful!',
            username: checkuser.username, 
            emailid: checkuser.emailid
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'An error occurred. Please try again.' });
    }
};


