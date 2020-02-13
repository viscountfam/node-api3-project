const express = require('express');
const postdb = require('./postDb.js')
const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  postdb.get(req.query)
  .then(posts => {
    res.status(200).json(posts)
  }).catch(error => {
    console.log(error)
    res.status(500).json({message: "Error retrieving the posts"})
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
  postdb.getById(req.param.id)
  .then(user => {
    res.status(200).json(user)
  }).catch(error => {
    console.log(error)
    res.status(500).json({message: "Error retrieving the posts"})
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  postdb.remove(req.param.id)
  .then(count => {
    res.status(200).json(count)
  }).catch(error => {
    console.log(error)
    res.status(500).json({message: "Error deleting the post"})
  })
});

router.put('/:id', validatePost, (req, res) => {
  // do your magic!
  postdb.remove(req.param.id, req.body).then(count => {
    res.status(200).json(count)
  }).catch(error => {
    console.log(error)
    res.status(500).json({message: "update unsuccessful"})
  })
});

router.post('/', validatePost, (req, res) => {
  postdb.insert(req.body).then(newPost => {
    res.status(200).json(newPost)
  }).catch(error => {
    console.log(error)
    res.status(500).json({message: "update unsuccessful"})
  })
})

// custom middleware


function validatePost(req, res, next) {
  if(!req.body){
      res.status(400).json({errorMessage: "Missing post data"})
  }
  else if(!req.body.text){
      res.status(400).son({errorMessage: "Missing required text field"})
  } else {
      next()
  }
}


module.exports = router;
