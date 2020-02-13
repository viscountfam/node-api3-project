const express = require('express');
const userRouter = require('./users/userRouter.js')
const postRouter = require('./posts/postRouter.js')
const server = express();

server.use(express.json());
server.use(logger);

server.use("/api/users", userRouter)
server.use("/api/posts", postRouter)

server.get('/', (req,res) => {
    res.send(`
    <h2>Welcome to the API</h2>`)
})

function logger(req, res, next) {
    console.log(`${req.method} Request to ${req.originalUrl} at ${new Date()}`)
    next()
}

const port = 5000
server.listen(port, () => console.log(`\n** API listening on post ${port} **\n`))