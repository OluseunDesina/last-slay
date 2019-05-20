const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const checkAuth = require('../check-token');

const Admin = require("../models/admin");

router.post('/create', checkAuth, (req, res, next) =>
{
    bcrypt.hash(req.body.password, 10).then(hash => {
        const adminUser = new Admin({
            Firstname: req.body.firstname,
            Lastname: req.body.lastname,
            Email: req.body.email,
            Username: req.body.username,
            Role: req.body.role,
            Password: hash
        });
    let user = adminUser;
    console.log(user);
    console.log(req.body.email);

    adminUser.save()
            .then(result => {
                console.log(result);
                if (!result)
                {
                    return res.status(401).json({
                        message: "Auth Failed!"
                    });
                }
                res.status(201).json({
                    message: "Admin User has been created!",
                    result: result
                })
            })
            .catch(err => {
                return res.status(500).json({
                    message: "Auth Failed!",
                    error: err
                })
            })
    })

});


router.post('/login', (req, res, next) => {
  let fetchedAdmin;
  Admin.findOne({Username: req.body.email}).then(user => {
    if (!user) {
      return res.status(401).json({
        message: "Username/Email does not exist",
        error: err
      });
    }
    fetchedAdmin = user;
    return bcrypt.compare(req.body.password, user.Password);
  })
  .then(result => {
    if (!result) {
        return res.status(401).json({
        message: "Password Mismatch, please check the password and try again",
        error: err
      });
    }
    const token = jwt.sign({username: fetchedAdmin.Username, userId: fetchedAdmin._id, isSuper: fetchedAdmin.Role},
                            "The_Quick_Brown_Fox(C0d3$$y.10)_Jumped_Over_The_Lazy_Dog",
                            {expiresIn: "1h"});
    return res.status(200).json({
      message: "Check! Login successful",
      token: token,
      isSuper: fetchedAdmin.Role
    });


  })
  .catch(err => {
      return res.status(401).json({
      message: " Failed",
      error: err
    });
  })
});


// read all admins
router.get('/view', checkAuth, (req, res, next) => {
  Admin.find().then(result => {
    if(!result) {
      return res.status(401).json({
        message: "Admins are unavailable",
        error: err})
    };
    res.status(200).json({
      result: result
    })
  })
});



router.get('/view/:id', checkAuth, (req, res, next) => {
  Admin.findOne({_id: req.params.id}).then(result => {
    if(!result) {
      return res.status(401).json({
        message: "Admin unavailable",
        error: err})
    };
    res.status(200).json({
      result: result
    })
  })
});

router.get('/delete/:id', checkAuth, (req, res, next) => {
  Admin.deleteOne({_id: req.params.id}).then(result => {
    if(!result) {
      return res.status(401).json({
        message: "Couldn't delete",
        error: err})
    };
    res.status(201).json({
      message: "Successfully deleted"
    })
  })
});


// Update Id
router.put('/update/:id', checkAuth, (req, res, next) => {

  const update = new Admin({
        Firstname: req.body.firstname,
        Lastname: req.body.lastname,
        Email: req.body.email
  })

  Admin.findOneAndUpdate({_id: req.params.id}, update).then(result =>
  {
      if(!result){
        res.status(401).json({
          error: err,
          message: "failed"
        })
      };
      res.status(200).json({
        message: "Admin updated",
        result: result
      })
    })
});

module.exports = router;
