const authenticationService = require('../services/authService');

const signIn = async (req, res) => {
    try {
        const data = req.body;
        const result = await authenticationService.signIn(req, res);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { signIn };
