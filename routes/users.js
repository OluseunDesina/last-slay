const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const datetime = new Date();
const User = require("../models/users");
const checkAuth = require('../check-token');



// Create User
router.post('/create', checkAuth, (req, res, next) =>
{
    let dummy;
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
          Firstname: req.body.firstname,
          Lastname: req.body.lastname,
          Email: req.body.email,
          Username: req.body.username,
          Address: req.body.address,
          Phone_no: req.body.phone_no,
          Gender: req.body.gender,
          Date:  datetime.toISOString().slice(0,10),
          Password: hash
        });
    /*let user = adminUser;
    console.log(user);
    console.log(req.body.email);*/

        user.save()
            .then(result => {
                console.log(result);
                if (!result)
                {
                    return res.status(401).json({
                        message: "Couldn't save successfully!"
                    });
                }
                res.status(201).json({
                    message: "User has been created!",
                    result: result
                })
/*
                dummy = result;

                User.findOne({Email: dummy.Email}).then(doc => {

                  if (!doc) {
                    console.log("Couldn't find User!");
                  } else {
                  console.log("User to be updated has been found!");
                  console.log("Created_At: "+ doc.created_at)


                  User.aggregate(
                   [
                     {
                       $project: {
                          yearMonthDayUTC: { $dateToString: { format: "%Y-%m-%d", date: "$doc.created_at" } },
                          timewithOffsetNY: { $dateToString: { format: "%H:%M:%S:%L%z", date: "$doc.created_at", timezone: "America/New_York"} },
                          timewithOffset430: { $dateToString: { format: "%H:%M:%S:%L%z", date: "$doc.created_at", timezone: "+04:30" } },
                          minutesOffsetNY: { $dateToString: { format: "%Z", date: "$doc.created_at", timezone: "America/New_York" } },
                          minutesOffset430: { $dateToString: { format: "%Z", date: "$doc.created_at", timezone: "+04:30" } }
                       }
                     }
                   ]
                ).then(date => {
                  if (!date) {
                      console.log("Date Conversion Failed!");
                  } else {
                    console.log("Conversion Successful.  Date: "+ date);

                    User.findOneAndUpdate({Email: dummy.Email}, {Date: date.yearMonthDayUTC}).then(update => {
                    if(!update) {
                    console.log("Cannot update user");
                    }
                    console.log("Update Successful! \n");
                    //console.log("Result : "+ date.yearMonthDayUTC)

                    
                    console.log(datetime.toISOString().slice(0,10));

                    })
                  }
                })

                
                }
                  
              })
   */         
            })
            .catch(err => {
                return res.status(500).json({
                    message: "Auth Failed!",
                    error: err
                })
            })


    })
  })
/*
});
*/

router.get('/metrics', checkAuth, (req,res,next) => {
 User.estimatedDocumentCount({ Date: { $gte: new Date(2019, 4, 1) } }).then(result => {
    
    if (!result) {
      res.status(401).json({
        message: "Failed!"
      })
    }
    
    res.status(201).json({
        message: "Successful",
        result: result
    })
  })   
/* 
      User.find({ Date: { $gt: new Date(2019, 5, 1) } }).then(users => {
        if (!users) {
         
          console.log("Couldn't find!")
        } else {
        
           console.log("Successful"+ users)
          }
      })
*/
    
 
})


router.put('/update/:id', (req,res,next) => {

  const update = new User({
          Firstname: req.body.firstname,
          Lastname: req.body.lastname,
          Email: req.body.email,
          Phone_no: req.body.phone_no,
        })

  User.findOneAndUpdate({_id: req.params.id}, update).then(result => {
    if(!result) {
      return res.status(401).json({
        message: "Cannot update user",
        error: err})
    };
    res.status(200).json({
      result: result
    })
  })
})


// read all categories
router.get('/view', (req, res, next) => {
  User.find().then(result => {
    if(!result) {
      return res.status(401).json({
        message: "Cannot access users",
        error: err})
    };
    res.status(200).json({
      result: result
    })
  })
});

router.get('/reset/:id', (req,res,next) => {
  User.findOne({_id: req.params.id}).then(user => {

    // let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'chibuezendubuisi98@gmail.com', // generated ethereal user
            pass: 'thebastard16' // generated ethereal password
          },
          tls: {rejectUnauthorized: false}
        });

        // send mail with defined transport object
        let mailOptions = {
          from: '"Fred Foo 👻" chibuezendubuisi98@gmail.com', // sender address
          to: user.Email, // list of receivers
          subject: "Password Reset", // Subject line
          html: `<b>Hello ${user.Username} </b><br/>
          <p>To reset password, click the link below.</p>`

        };

        transporter.sendMail(mailOptions,(error, info) => {
          if(error) {
            console.log(error);
            res.status(401).json({
              message: "Sending Failed",
              error: error
            })
          }
          else {
            console.log("Mail sent successfully");
            res.status(201).json({
              message: "Message Successfully sent.",
            })
          }
        })

/*
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      }
*/
  })


})

router.get('/view/:id', (req, res, next) => {
  User.findOne({_id: req.params.id}).then(result => {
    if(!result) {
      return res.status(401).json({
        message: "Cannot access users",
        error: err})
    };
    res.status(200).json({
      result: result 
    })
  })
});

router.get('/delete/:id', (req, res, next) => {
  User.deleteOne({_id: req.params.id}).then(result => {
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

//count
router.get('/count', (req, res, next) => {
  User.find().estimatedDocumentCount().then(result => {
    console.log(result);
  })
});
// read one category by name
/*
router.get('/:name', (req, res, next) => {
  Category.findOne({name: req.params.name}).then(result => {
    if(!result) {
      return res.status(401).json({
        message: "Username/Email does not exist",
        error: err})
    };
    res.status(201).json({
      result: result
    })
  })
});*/



// count --Ruby
/*router.get('/count', (req, res, next) => {
  Category.count().then(result => {
    console.log(result);
    res.status(201).json({
        message: "Successful Category was Created!",
        result: result
    })
  })
}); */
module.exports = router;
