const { createUser } = require('./UserModel');

const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const user = await createUser(name, email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({message: 'Server Error '});
    }
};

module.exports = { registerUser };