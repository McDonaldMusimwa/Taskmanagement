const mongooose = require("mongoose");
const Scheema = mongooose.Schema;
const taskSchema = new Scheema({
    owener: String,
    title: String,
    description: String,
    dateToDo: String,
    starttime: String,
    endtime: String,
    collaboration: {
        require: false,
        type: String,
    },
    status: {
        type: String,
        enum: ["done", "not done", "in progress"],
    },
});
const Task = mongooose.model("Task", taskSchema, "tasks");
module.exports = { Task };
//# sourceMappingURL=task.js.map