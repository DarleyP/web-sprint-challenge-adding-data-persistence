const router = require('express').Router()
const Project = require('./model') // eslint-disable-line

router.get('/', async (req, res,next) => {
    try {
        const projects = await Project.getProjects();
        res.status(200).json(projects);
    } catch (error) {
      next(error)
    }
});

router.use((err,req,res,next) => { // eslint-disable-line
    res.status(500).json({
        message: 'yay'
    })
})

module.exports = router