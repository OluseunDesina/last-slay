const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const checkAuth = require('../check-token');


// Create Category
router.post('/create', checkAuth, (req, res, next) =>
{
        const category = new Category({
          name: req.body.name,
        });

    category.save()
            .then(result => {
                console.log(result);
                if (!result)
                {
                    return res.status(401).json({
                        message: "Categorry already exist!"
                    });
                }
                res.status(201).json({
                    message: "Successful Category was Created!",
                    result: result
                })
            })
            .catch(err => {
                return res.status(500).json({
                    message: "Failed Unknown error!",
                    error: err
                })
            })
});

// read all categories
router.get('/view', checkAuth, (req, res, next) => {
  Category.find().then(result => {
    if(!result) {
      return res.status(401).json({
        message: "Categories are unavailable",
        error: err})
    };
    res.status(200).json({
      result: result
    })
  })
});

router.get('/view/:id', checkAuth, (req, res, next) => {
  Category.findOne({_id: req.params.id}).then(result => {
    if(!result) {
      return res.status(401).json({
        message: "Category unavailable",
        error: err})
    };
    res.status(200).json({
      result: result
    })
  })
});

router.post('/delete/:id', checkAuth, (req, res, next) => {
  Category.deleteOne({_id: req.params.id}).then(result => {
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

// Update Id
router.put('/update/:id', checkAuth, (req, res, next) => {

  const cat = new Category({
        name: req.body.name
  })

  Category.findOneAndUpdate({_id: req.params.id}, cat).then(result =>
  {
      if(!result){
        res.status(401).json({
          error: err,
          message: "failed"
        })
      };
      res.status(200).json({
        message: "category updated",
        result: result
      })
    })
});

//count
router.get('/count', (req, res, next) => {
  Category.find().estimatedDocumentCount().then(result => {
    console.log(result);
  })
});

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
