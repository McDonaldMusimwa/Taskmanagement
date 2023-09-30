"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authCheck_1 = __importDefault(require("../services/authCheck"));
const task_1 = __importDefault(require("../controller/task"));
const controller = new task_1.default();
const router = (0, express_1.Router)();
router.get('/', authCheck_1.default, (req, res) => {
    controller.getAllTasks(req, res);
});
router.get('/onetask/:taskid', authCheck_1.default, (req, res) => controller.getOneTask(req, res));
router.post('/addtask/:userId', authCheck_1.default, (req, res) => controller.addTask(req, res));
router.patch('/:taskid', authCheck_1.default, (req, res) => controller.modifyTask(req, res));
router.delete('/:taskid', authCheck_1.default, (req, res) => controller.deleteOneTask(req, res));
module.exports = router;
//# sourceMappingURL=task.js.map