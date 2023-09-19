import { Task } from '../models/taskModel.js'

export const newTask = async (req, res, next) => {
    const {title, description} = req.body;
     
    await Task.create({
        title,
        description,
        user: req.user,
    });

    res.status(201).json({
        success: true,
        message: "Task added successfully",
    })
}

export const getMyTasks = async (req, res) => {
    const userid = req.user._id;

    const tasks = await Task.find({user : userid});

    res.status(200).json({
        success: true,
        tasks,
    })
};

export const updateTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  next();

  if (!task)
    return exports.status(404).json({
      success: false,
      message: "Invalid ID",
    });

  task.isCompleted = !task.isCompleted;

  await task.save();

  res.status(200).json({
    success: true,
    message: "Task updated",
  });
};

export const deleteTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if(!task) return exports.status(404).json({
    success: false,
    message: "Invalid ID",
  })

  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "Task deleted",
  });
};