const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const checkAuth = require('../check-token');


const Professionals = require("../models/professionals");

// Create Category
router.post('/create', checkAuth, (req, res, next) =>
{
    bcrypt.hash(req.body.password, 10).then(hash => {
        const professional = new Professionals({
            Firstname: req.body.firstname,
            Lastname: req.body.lastname,
            Email: req.body.email,
            Username: req.body.username,
            Password: hash,
            Address: req.body.address,
            Phone_No: req.body.phone_no

        });

    professional.save()
            .then(result => {
                console.log(result);
                if (!result)
                {
                    return res.status(401).json({
                        message: "Could not create!"
                    });
                }
                res.status(201).json({
                    message: "Created successfully!",
                    result: result
                })
            })
            .catch(err => {
                return res.status(500).json({
                    message: "Operation Failed!",
                    error: err
                })
            })
    })

});



// view professionals
router.get('/view', checkAuth, (req, res, next) => {
  Professionals.find().then(result => {
    if(!result) {
      return res.status(401).json({
        message: "Unable to find professionals",
        error: err})
    };
    res.status(200).json({
      result: result
    })
  })
});

// view professionals by id or parameter
router.get('/view/:id', checkAuth, (req, res, next) => {
  Professionals.findOne({_id: req.params.id}).then(result => {
    if(!result) {
      return res.status(401).json({
        message: "Unable to find professionals",
        error: err})
    };
    res.status(200).json({
      result: result
    })
  })
});

// Update professionals by Id
router.put('/update/:id', checkAuth, (req, res, next) => {

  const prof = new Professionals({
        Firstname: req.body.firstname,
        Lastname: req.body.lastname,
        Email: req.body.email
  })

  Professionals.findOneAndUpdate({_id: req.params.id}, prof).then(result =>
    {
      if(!result){
        res.status(401).json({
          error: err,
          message: "failed"
        })
      };
      res.status(200).json({
        message: "Professional updated",
        result: result
      })
    })
});

//delete professionals by email or id
router.get('/delete/:id', checkAuth, (req,res,next) => {
  Professionals.deleteOne({_id: req.params.id}).then(result => {
    if (!result) {
       return res.status(401).json({
        message: "unable to delete",
        error: err})
    };

     res.status(201).json({
      message: "Deleted successfully",
    })
  })
});


/* find a professional by his/her id
router.get('/:id', (req, res, next) => {
  Professionals.findById(req.params.id).then(result => {
    if(!result) {
      return res.status(401).json({
        message: "unable to find professional",
        error: err})
    };
    res.status(201).json({
      result: result
    })
  })
});
*/


module.exports = router;
