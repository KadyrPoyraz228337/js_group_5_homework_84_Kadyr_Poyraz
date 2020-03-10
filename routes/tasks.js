const express = require('express'),
  router = express.Router(),
  isAuth = require('../middlewares/isAuth'),
  TaskService = require('../service/task');

router.post('/', isAuth, async (req, res) => {
  try {
    const
      userId =        req.currentUser._id,
      title =         req.body.title,
      description =   req.body.description,
      status =        req.body.status;

    const taskService = new TaskService();
    const task = await taskService.addTask(userId, title, description, status);

    res.send(task)
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete('/:id', isAuth, async (req, res) => {
  try {
    const
      id =       req.params.id,
      userId =   req.currentUser._id;

    const taskService = new TaskService();
    const removedTask = await taskService.deleteTask(id, userId);

    res.send(removedTask);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.put('/:id', isAuth, async (req, res) => {
  try {
    const
      id =            req.params.id,
      userId =        req.currentUser._id,
      title =         req.body.title,
      description =   req.body.description,
      status =        req.body.status;

    const taskService = new TaskService();
    const updatedTask = await taskService.updateTask(title, description, status, id, userId);

    res.send(updatedTask)
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get('/', isAuth, async (req, res) => {
  const user = req.currentUser;

  const taskService = new TaskService();
  const tasks = await taskService.getAllTasks(user._id);
  res.send(tasks);
});

module.exports = router;