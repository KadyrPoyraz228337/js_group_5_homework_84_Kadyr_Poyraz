const Task = require('../models/Task');

module.exports = class TaskService {
  constructor() { }

  async addTask(user, title, description, status) {
    return new Promise(async (resolve, reject) => {
      try {
        const task = await Task.create({ user, title, description, status });
        resolve({ task })
      } catch (e) {
        reject(e)
      }
    })
  }

  async getAllTasks(id) {
    return new Promise((async (resolve, reject) => {
      try {
        const tasks = await Task.find({ user: id });
        resolve(tasks);
      } catch (e) {
        reject(e)
      }
    }))
  }

  async updateTask(title, description, status, id, userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const task = await Task.findOne({_id: id});
        if(task._id !== userId) {
          return reject({error: 'You can not update this task'})
        }
        if(status !== 'new' && status !== 'in_progress' && status !== 'complete') {
          return reject({error: '"status" must be valid'})
        }
        const updateTask = await Task.updateOne({_id: id}, {
          title: title,
          description: description,
          status: status
        });

        resolve({ updateTask });
      } catch (e) {
        reject(e)
      }
    })
  }

  async deleteTask(id, userId) {
    return new Promise((async (resolve, reject) => {
      try {
        const task = await Task.findOne({_id: id});
        if(task.user.toString() !== userId.toString()) {
          return reject({error: 'You can not delete this task'})
        }
        const removedTask = await Task.remove({_id: id});
        resolve(removedTask);
      } catch (e) {
        reject(e);
      }
    }))
  }
};