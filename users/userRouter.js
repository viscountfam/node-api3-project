const express = require("express");
const userDatabase = require("../users/userDb.js");
const router = express.Router();

router.post("/", validateUser, (req, res) => {
  // do your magic!
  userDatabase.insert(req.body)
    .then(resource => {
      res.status(201).json(resource);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The new user was not created" });
    });
});

// router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
//   // do your magic!
//   const { id } = req.params;
//   userDatabase.insert(id)
  

// });

router.get("/",  (req, res) => {
  // do your magic!
  userDatabase
    .get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving the posts" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  console.log("this is the req", id)
  userDatabase.getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving the posts" });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  userDatabase.getUserPosts(id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({Message: "Error retrieving the posts"})
  })
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  userDatabase
    .remove(id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error deleting the user" });
    });
});

router.put("/:id", validateUser, (req, res) => {
  // do your magic!
  userDatabase
    .update(req.param.id, req.body)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "update unsuccessful" });
    });
});

//custom middleware

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

function validateUser(req, res, next) {
  if(!req.body){
      res.status(400).json({errorMessage: "Missing user data"})
  } else if(!res.body.name) {
      res.status(400).json({errorMessage: "missing required name field"})
  } else {
      next()
  }

}

function validateUserId(req,res,next ) {
  const { id } = req.params;
  userDatabase
    .getById(id)
    .then(user => {
      console.log("user exists?", user)
      if(user) {
        req.user = user
        next()
      } else {
        res.status(404).json({message: "no user with that id was found"})
      }
    })
}


module.exports = router;
