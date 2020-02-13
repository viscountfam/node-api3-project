const express = require('express');
const userdatabase = require('./users/userDb.js')
const postRouter = require('./posts/postRouter.js')
const server = express();

server.use(express.json());
server.use(logger);


server.use("/api/posts", postRouter)

server.get('/', (req, res) => {
    userdatabase.get(req.query)
    .then(users => {
        res.status(200).json(users)
    }).catch(error => {
        console.log(error)
        res.status(500).json({message: "Error retrieving the posts"})
    })
});

server.get('/:id', validateUserID, (req, res) => {
    userdatabase.getById(req.param.id)
    .then(user => {
        res.status(200).json(user)
    }).catch(error => {
        console.log(error)
        res.status(500).json({message: "Error retrieving the posts"})
    })
})

server.post('/', validateUser, (req, res) => {
    userdatabase.insert(req.body).then(resource => {
        res.status(201).json(resource)
    }).catch(error => {
        console.log(error)
        res.status(500).json({message: "The new user was not created"})
    })
} )

server.delete('/:id', validateUserID, (req, res) => {
    userdatabase.remove(req.param.id).then(count => {
        res.status(200).json(count)
    }).catch(error => {
        console.log(error)
        res.status(500).json({message: "Error deleting the user"})
    })
})

server.put('/:id', validateUser, validateUserID,  (req, res) => {
    userdatabase.update(req.param.id, req.body).then(count => {
        res.status(200).json(count)
    }).catch(error => {
        console.log(error)
        res.status(500).json({message: "update unsuccessful"})
    })
})



function logger(req, res, next) {
    console.log(`${rew.method} Request to ${req.originalUrl} at ${Date.now()}`)
    next()
}

function validateUserID(req, res, next) {
    if(userdatabase.getById(req.param.id)){
        req.user = {...req.body.id}
        next()
    } else{
        res.status(404).json({errorMessage: "Invalid user id"})
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

const port = 5000
server.listen(port, () => console.log(`\n** API listening on post ${port} \n`))