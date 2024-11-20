const bcrypt = require('bcryptjs');
const UserAuth = require('./model');

exports.signup = async (req, res) => {
    const { username, password } = req.body;
    console.log("in signup")
    try {
        const existingUser = await UserAuth.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserAuth({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully'});
    } catch (err) {
        console.log("error",err)
        res.status(500).json({ message: 'Failed to create user' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await UserAuth.findOne({ username });
        if (!existingUser) return res.status(404).json({ message: 'User not found' });
        
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to login' });
    }
};

// exports.resetPassword = async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const existingUser = await UserAuth.findOne({ username });
//         if (!existingUser) return res.status(404).json({ message: 'User not found' });
        
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const newUser = new UserAuth({ username, password: hashedPassword });
//       await newUser.save();

//         res.status(200).json({ message: 'Login successful' });
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to login' });
//     }
// };