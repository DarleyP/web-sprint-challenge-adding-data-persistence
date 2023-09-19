const db = require('../../data/dbConfig')

async function getResr() {
    const resources = await db('resources');
    return resources;
}

async function postResr(newResource) {
    const existingResource = await db('resources')
    .where('resource_name', newResource.resource_name)
    .first();

  if (existingResource) {
    throw new Error('Resource with the same name already exists.');
  }

  const [resourceId] = await db('resources').insert(newResource);

  const insertedResource = await db('resources')
    .where({ resource_id: resourceId })
    .first();

  return insertedResource;
}

module.exports = {
    getResr,
    postResr
}