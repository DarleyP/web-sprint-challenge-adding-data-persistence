const router = require('express').Router()
const {
  getResr,
  postResr
} = require('./model')

router.get('/', async (req, res, next) => {
  try {
    const resources = await getResr();

    const formattedResources = resources.map(resource => ({
      resource_id: resource.resource_id,
      resource_name: resource.resource_name,
      resource_description: resource.resource_description || null,
    }));

    res.status(200).json(formattedResources);
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req,res,next) => {
  const newResource = req.body;

  try {
    const existingResource = await postResr(newResource);
    res.status(201).json(existingResource);
  } catch (error) {
    if (error.message === 'Resource with the same name already exists.') {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: 'Internal Server Error'
  })
})

module.exports = router