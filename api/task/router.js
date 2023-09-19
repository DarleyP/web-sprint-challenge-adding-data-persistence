const router = require('express').Router()
const { 
    getTask,
    postTask
} = require('./model') // eslint-disable-line

router.get('/', async(req,res,next) => {
    try {
        const tasks = await getTask();
        res.status(200).json(tasks);
      } catch (error) {
        next(error);
      }
})

router.post('/', async (req,res,next) => {
    const newTask = req.body;

    try {
      const insertedTask = await postTask(newTask);
  
      res.status(201).json(insertedTask);
    } catch (error) {
      if (error.message === 'A task_description is required.' || error.message === 'A valid project_id is required.') {
        return res.status(400).json({ message: error.message });
      } else {
        next(error);
      }
    }
})

router.use((err,req,res,next) => { // eslint-disable-line
    res.status(500).json({
        message: 'Internal Server Error'
    })
})

module.exports = router
