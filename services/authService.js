require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db.config');
const credentialsController = require('../controller/userController'); // Adjust path as needed

const authenticationService = {
  async signIn(req, res) {
    try {
      const { Email, Password } = req.body;

      const userInfo = await db.userCredentials.findOne({
        where: { Email },
        include: [{
          model: db.user,
          required: true
        }]
      });

      if (userInfo && await bcrypt.compare(Password, userInfo.Password)) {
        const userId = userInfo.User.Id;
        const userFeatures = await credentialsController.getUserFeatures(userId);

        let payload = {
          UserId: userInfo.User.Id,
          FirstName: userInfo.User.FirstName,
          LastName: userInfo.User.LastName,
          Email: userInfo.Email,
          UserTypeId: userInfo.User.UserTypeId
        };

        let token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1hr' });

        return res.json({
          success: true,
          token: token,
          features: userFeatures,
          message: 'Login successfully'
        });
      } else {
        return res.json({
          success: false,
          message: 'Invalid username or password!'
        });
      }
    } catch (error) {
      return res.json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = authenticationService;
