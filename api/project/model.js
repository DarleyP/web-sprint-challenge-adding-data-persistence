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

async function postProject(newProject) {


    newProject.project_completed = newProject.project_completed ? 1 : 0;

  
    const [projectId] = await db('projects').insert(newProject);


    const insertedProject = await db('projects')
        .where({ project_id: projectId })
        .first();


    insertedProject.project_completed = Boolean(insertedProject.project_completed);

    return insertedProject;

}

module.exports = {
    getProjects,
    postProject
}