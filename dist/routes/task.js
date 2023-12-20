"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_1 = __importDefault(require("../controller/task"));
const controller = new task_1.default();
const router = (0, express_1.Router)();
router.get('/:userid', (req, res) => {
    controller.getAllTasks(req, res);
});
router.get('/onetask/:taskid', (req, res) => controller.getOneTask(req, res));
router.post('/addtask/:userId', (req, res) => controller.addTask(req, res));
router.patch('/:taskid', (req, res) => controller.modifyTask(req, res));
router.delete('/:taskid', (req, res) => controller.deleteOneTask(req, res));
exports.default = router;
//# sourceMappingURL=task.js.map