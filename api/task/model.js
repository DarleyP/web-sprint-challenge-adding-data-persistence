const db = require('../../data/dbConfig')

async function getTask() {
    const tasks = await db('tasks as t')
    .leftJoin('projects as p', 't.project_id', 'p.project_id')
    .select(
      't.task_id',
      't.task_description',
      't.task_notes',
      't.task_completed as task_completed', 
      'p.project_name',
      'p.project_description'
    );

  const formattedTasks = tasks.map(task => ({
    ...task,
    task_completed: !!task.task_completed,
  }));

  return formattedTasks;
}

async function postTask(newTask) {
    if (!newTask.task_description) {
        throw new Error('A task_description is required.');
      }
  
      if (!newTask.project_id || isNaN(newTask.project_id)) {
        throw new Error('A valid project_id is required.');
      }
  
      const [taskId] = await db('tasks').insert(newTask);

      const insertedTask = await db('tasks')
        .where({ task_id: taskId })
        .first();
  

        insertedTask.task_completed = Boolean(insertedTask.task_completed);

      return insertedTask;
}

module.exports = {
    getTask,
    postTask
}
