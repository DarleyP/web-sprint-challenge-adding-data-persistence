const db = require('../../data/dbConfig')

async function getProjects() {

    const projects = await db('projects')
    .select('project_name', 'project_description', 'project_completed');


const formattedProjects = projects.map(project => ({
    ...project,
    project_completed: Boolean(project.project_completed),
}));

return formattedProjects;
}

module.exports = {
    getProjects
}