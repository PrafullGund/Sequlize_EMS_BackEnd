const db = require('../config/db.config');
const { userJoi } = require('../helpers/userJoi');
const bcrypt = require('bcrypt');
const { getUserInfo } = require('./userCredentialsController');
const { where } = require('sequelize');
const saltRounds = 10;

const postUserController = async (req, res) => {
    const { error, value } = userJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    const { 
        FirstName, 
        LastName, 
        DOB, 
        UserTypeId, 
        Email, 
        Mobile, 
        Password, 
        AddressLineOne, 
        AddressLineTwo, 
        Country, 
        State, 
        City, 
        PostalCode,
        EducationTitle,
        Description,
        PassingYear,
        RoleId
    } = value;

    try {
        const newUser = await db.user.create({
            FirstName,
            LastName,
            DOB,
            UserTypeId
        });

        const hashedPassword = await bcrypt.hash(Password.toString(), saltRounds);
        const newUserCredentials = await db.userCredentials.create({
            UserId: newUser.Id,
            Email,
            Mobile,
            Password: hashedPassword
        });

        const newUserAddresses = await db.userAddresses.create({
            UserId: newUser.Id,
            AddressLineOne,
            AddressLineTwo,
            Country,
            State,
            City,
            PostalCode
        });

        const newUserEducationDetails = await db.userEducationDetails.create({
            UserId: newUser.Id,
            EducationTitle,
            Description,
            PassingYear
        });

       const newUserRoleMapper=await db.userRoleMapper.create({
        UserId:newUser.Id,
        RoleId
       })

        const userData = {
            ...newUser.toJSON(),
            Email: newUserCredentials.Email,
            Mobile: newUserCredentials.Mobile,
            Password: newUserCredentials.Password,
            AddressLineOne: newUserAddresses.AddressLineOne,
            AddressLineTwo: newUserAddresses.AddressLineTwo,
            Country: newUserAddresses.Country,
            State: newUserAddresses.State,
            City: newUserAddresses.City,
            PostalCode: newUserAddresses.PostalCode,
            EducationTitle: newUserEducationDetails.EducationTitle,
            Description: newUserEducationDetails.Description,
            PassingYear: newUserEducationDetails.PassingYear,
            RoleId:newUserRoleMapper.RoleId
        };

        res.status(201).send(userData); 
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the user.',
        });
    }
}


// const getAllUserController=async(req,res)=>{
//     const data=await db.user.findAll();
//     res.status(200).send(data);
// }

const getAllUserController = async (req, res) => {
    try {
      const data = await db.user.findAll({
        include: [
          { model: db.userCredentials },
          { model: db.userAddresses },
          { model: db.userEducationDetails },
          { model: db.userRoleMapper }
        ]
      });
      res.status(200).json(data);
    }
    catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while getting the user.',
        });

    }
}

const getByIdUserController = async (req, res) => {
    const userId = req.params.id;

    try {
        const data = await db.user.findByPk(userId, {
            include: [
                { model: db.userCredentials },
                { model: db.userAddresses },
                { model: db.userEducationDetails },
                { model: db.userRoleMapper }
            ]
        });

        if (!data) {
            return res.status(404).send({
                message: `User with id ${userId} not found.`
            });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while getting the user.'
        });
    }
};

const updateUserController = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const user = await db.user.findByPk(id, {
      include: [
        { model: db.userCredentials },
        { model: db.userAddresses },
        { model: db.userEducationDetails },
        { model: db.userRoleMapper }
      ]
    });

    if (!user) {
      return res.status(404).send({
        message: `User with id=${id} not found.`
      });
    }

  
    await db.user.update(
      {
        FirstName: updatedData.FirstName,
        LastName: updatedData.LastName,
        DOB: updatedData.DOB,
        UserTypeId: updatedData.UserTypeId
      },
      {
        where: {
          id: id
        }
      }
    );
    const hashedPassword = await bcrypt.hash(updatedData.Password.toString(), saltRounds);
    await db.userCredentials.update(
      {
        Email: updatedData.Email,
        Mobile: +updatedData.Mobile,
        Password: hashedPassword
      },
      {
        where: {
          userId: id
        }
      }
    );

      await db.userAddresses.update(
        {
          AddressLineOne: updatedData.AddressLineOne,
          AddressLineTwo: updatedData.AddressLineTwo,
          Country: updatedData.Country,
          State: updatedData.State,
          City: updatedData.City,
          PostalCode: updatedData.PostalCode
        },
        {
          where: {
            userId: id
          }
        }
      );

      await db.userEducationDetails.update(
        {
          EducationTitle: updatedData.EducationTitle,
          Description: updatedData.Description,
          PassingYear: updatedData.PassingYear
        },
        {
          where: {
            userId: id
          }
        }
      );

      await db.userRoleMapper.update(
        {
          RoleId: updatedData.RoleId
        },
        {
          where: {
            userId: id
          }
        }
      );

    res.send({
      message: 'User updated successfully.'
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'An error occurred while updating the user.'
    });
  }
};


const deleteUserController = async (req, res) => {
  const { id } = req.params;

  try {
      await db.userCredentials.destroy({
          where: {
              UserId: id
          }
      });
      await db.userAddresses.destroy({
          where: {
              UserId: id
          }
      });
      await db.userEducationDetails.destroy({
          where: {
              UserId: id
          }
      });
      await db.userRoleMapper.destroy({
          where: {
              UserId: id
          }
      });
      const user = await db.user.findByPk(id);
      if (!user) {
          return res.status(404).send({
              message: `User with id ${id} not found`,
          });
      }
      await user.destroy();

      res.send({
          message: `User with id ${id} and related records were deleted successfully.`,
      });
  } catch (error) {
      res.status(500).send({
          message: error.message || 'An error occurred while deleting the user',
      });
  }
};

const getUserByEmail=async(email,password)=>{
    try{
        const user=await getUserInfo(email,password);
        return user;
    }catch (error) {
        throw error;
    }
}

const getUserFeatures=async(userId)=>{
    try{
        const userRoles = await db.userRoleMapper.findAll({
            where: { UserId: userId },
            include: [{
              model: db.role,
              // include: [{
                // model: db.featureRoleMapping,
              //   include: [db.features]
              // }]
            }]
          });
    
          let features = [];
          userRoles.forEach(role => {
            role.role.featureRoleMappings.forEach(mapping => {
              features.push(mapping.feature);
            });
          });
    
          return features;
    }catch (error) {
        throw error;
    }
}

module.exports = {
    postUserController,
    getAllUserController,
    getByIdUserController,
    updateUserController,
    deleteUserController,
    getUserByEmail,
    getUserFeatures
};

