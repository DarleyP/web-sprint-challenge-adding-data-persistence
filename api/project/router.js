const router = require('express').Router()
const {
  getProjects,
  postProject
} = require('./model') // eslint-disable-line

router.get('/', async (req, res,next) => {
    try {
        const projects = await getProjects();
        res.status(200).json(projects);
    } catch (error) {
      next(error)
    }
});

router.post('/', async (req,res,next) => {
    const newProject = req.body;

    if (!newProject.project_name) {
      return res.status(400).json({ message: 'A project_name is required.' });
    }
  
    try {
      const insertedProject = await postProject(newProject);
      res.status(201).json({
        project_id: insertedProject.project_id,
        project_name: insertedProject.project_name,
        project_description: insertedProject.project_description || null,
        project_completed: Boolean(insertedProject.project_completed),
      });
    } catch (error) {
      next(error);
    }
})

router.use((err,req,res,next) => { // eslint-disable-line
    res.status(500).json({
        message: 'Internal Server Error'
    })
})

module.exports = router