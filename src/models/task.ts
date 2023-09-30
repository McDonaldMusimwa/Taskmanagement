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

export {TaskSchema}
