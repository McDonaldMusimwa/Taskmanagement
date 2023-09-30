"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskSchema = void 0;
const mongooose = require("mongoose");
const Scheema = mongooose.Schema;
const taskSchema = new Scheema({
    owener: String,
    title: String,
    description: String,
    dateToDo: String,
    starttime: String,
    endtime: String,
    status: Number,
});
const TaskSchema = mongooose.model('Task', taskSchema, 'tasks');
exports.TaskSchema = TaskSchema;
//# sourceMappingURL=task.js.map