import { Router } from 'express';
import { Request, Response } from 'express';
import AuthenticationCheck from '../services/authCheck';
import taskController from '../controller/task';
const controller = new taskController();

const router = Router();

router.get('/',AuthenticationCheck, (req: Request, res: Response) => {
    controller.getAllTasks(req, res)
}
);
router.get('/onetask/:taskid',AuthenticationCheck, (req: Request, res: Response) => controller.getOneTask(req, res));
router.post('/addtask/:userId',AuthenticationCheck, (req: Request, res: Response) => controller.addTask(req, res));
router.patch('/:taskid',AuthenticationCheck, (req: Request, res: Response) => controller.modifyTask(req, res));
router.delete('/:taskid',AuthenticationCheck, (req: Request, res: Response) => controller.deleteOneTask(req, res));

module.exports = router;