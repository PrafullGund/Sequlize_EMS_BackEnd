const { Model } = require('sequelize');
const db = require('../config/db.config');
const { userCredentialsJoi } = require('../helpers/userCredentialsJoi');
const bcrypt = require('bcrypt');
const { required } = require('joi');
const saltRounds = 10;

const postUserCredentialsController = async (req, res) => {
    const { error, value } = userCredentialsJoi.validate(req.body);

    if (error) {
        return res.status(400).send({
            message: error.details[0].message,
        });
    }

    const { UserId, Email, Mobile, Password } = value;
    const hashedPassword = await bcrypt.hash(Password.toString(), saltRounds);
    try {
        const credentials = await db.userCredentials.create({
            UserId,
            Email,
            Mobile,
            Password: hashedPassword
        })
        res.status(201).send(credentials);

    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the user'
        })
    }
}

const getAllUserCredentialsController = async (req, res) => {
    const data = await db.userCredentials.findAll();
    res.status(200).send(data);
}

const getByIdUserCredentialsController = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await db.userCredentials.findByPk(id);

        if (!data) {
            return res.status(404).send({
                message: `user with id=${id} not found`
            })
        }
        res.send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving the UserType.',
        });
    }
}

const updateUserCredentialsController = async (req, res) => {
    const { error, value } = userCredentialsJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }

    const { id } = req.params;
    const { UserId, Email, Mobile, Password } = value;

    try {
        const credentials = await db.userCredentials.findByPk(id);
        if (!credentials) {
            return res.status(404).send({
                message: `User with id ${id} not found`
            });
        }

        credentials.UserId = UserId;
        credentials.Email = Email;
        credentials.Mobile = Mobile;
        credentials.Password = Password;

        await credentials.save();
        res.send(credentials);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while updating the user'
        });
    }
};

const deleteUserCredentials = async (req, res) => {
    const { id } = req.params;

    try {
        const credentials = await db.userCredentials.findByPk(id);
        if (!credentials) {
            return res.status(404).send({
                message: `UserType with id ${id} not found.`,
            });
        }

        await credentials.destroy();
        res.send({
            message: `UserCredentials with ${id} was delete successfully`
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while updating the user'
        });
    }
}    

const getUserInfo = async (email, password) => {
    try {
        const credentials = await db.userCredentials.findOne({
            where: { Email: email },
            include: [{
                model: db.user,
                required: true
            }]
        });

        if (credentials && await bcrypt.compare(password, credentials.Password)) {
            return credentials.user;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error while querying the database:", error);
        throw error;
    }
};

module.exports = {
    postUserCredentialsController,
    getAllUserCredentialsController,
    getByIdUserCredentialsController,
    updateUserCredentialsController,
    deleteUserCredentials,
    getUserInfo
}