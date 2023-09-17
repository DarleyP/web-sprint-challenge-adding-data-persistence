const router = require('express').Router()
const Task = require('./model') // eslint-disable-line



router.use((err,req,res,next) => { // eslint-disable-line
    res.status(500).json({
        message: 'yay'
    })
})

module.exports = router
