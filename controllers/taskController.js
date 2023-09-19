import { Task } from '../models/taskModel.js'

export const newTask = async (req, res, next) => {
    const {title, description} = req.body;
     
    await Task.create({
        title,
        description,
    });
}