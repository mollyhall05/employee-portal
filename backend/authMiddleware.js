const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => { 
    const token = req.header('Authorisation');
    if (!token) return res.status(401).json({message: 'Access Denied'});

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.uesr = verified;
        next();
    } catch (error) {
        res.status(400).json({message: 'Invalid Token'});
    }
};

module.exports = { authMiddleware };