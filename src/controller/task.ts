import { Request, Response, NextFunction } from 'express';

import { TaskSchema } from '../models/task';

export default class taskController {

    public async addTask(req: Request, res: Response): Promise<void> {
        //#swagger.tags=['Task']
        let userId: String = req.params.userId;
        console.log(userId)
        try {
            const taskItem = {
                owener: userId,
                title: req.body.title,
                description: req.body.description,
                dateToDo: req.body.dateToDo,
                starttime: req.body.starttime,
                endtime: req.body.endtime,
                status: req.body.status

            }

            const newTask = new TaskSchema(taskItem)

            //console.log(newTask)
            const response = await newTask.save()
            //console.log(response)
            res.status(200).json(response);
        } catch (message) {
            res.status(500).json({ messsage: 'Internal Server Error' });
        }
    }
    public async getAllTasks(req: Request, res: Response): Promise<void> {
        try {
            const userid = req.params.userid; // Correctly access the userid from req.params
            // Ensure req.user and req.user._id are defined
            if (!userid) {
                res.status(401).json({ message: 'User not authenticated' });
                return;
            }

            const userId = req.params.userid;
            console.log(userid);
            const tasks = await TaskSchema.find({ owener: userId });
            console.log(tasks);

            if (!tasks || tasks.length === 0) {
                res.status(404).json({ message: 'No tasks found' });
            } else {
                res.status(200).json(tasks);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async getOneTask(req: Request, res: Response): Promise<void> {
        //#swagger.tags=['Task']
        const taskId = req.params.taskId;

        try {
            // Use the Task model to find the task by its _id
            const Onetask = await TaskSchema.findOne({ _id: taskId });

            if (Onetask) {
                // Task with the provided _id was found
                res.status(200).json(Onetask);
            } else {
                // No task with the provided _id was found
                res.status(404).json({ message: 'Task not found' });
            }
        } catch (message) {
            //console.error(message);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async deleteOneTask(req: Request, res: Response): Promise<void> {
        //#swagger.tags=['Task']
        const taskId = req.params.taskid;

        try {
            // Use the Task model to delete the task by its _id
            const result = await TaskSchema.deleteOne({ _id: taskId });
            console.log(result)
            if (result.deletedCount === 1) {
                // Successfully deleted one task
                res.status(200).json({ message: 'Successfully deleted' });
            } else {
                // No task with the provided _id was found
                res.status(404).json({ message: 'Task not found' });
            }
        } catch (message) {
            //console.error(message);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async modifyTask(req: Request, res: Response): Promise<void> {
        //#swagger.tags=['Task']
        const taskId = req.params.taskid;
        //console.log(taskId)

        try {
            const task = await TaskSchema.findById({ _id: taskId });
            if (!task) {
                res.status(404).json({ message: 'Task not found' });
                return;
            }
            console.log('this is the taskj' + task)
            const Status: string = req.body.status;
            // Update the task properties
            task.owner = req.params._id;
            task.title = req.body.title;
            task.description = req.body.description;
            task.dateToDo = req.body.dateToDo;
            task.starttime = req.body.starttime;
            task.endtime = req.body.endtime;
            task.status = parseInt(Status);
            await task.save();

            res.status(200).json({ message: 'Task modified successfully', task });
        } catch (message) {
            //console.error(message); // Log the error for debugging
            res.status(500).json({ message: 'Internal Server Error' });
        }

    }

}

