import { Router } from 'express';
import { Request, Response } from 'express';
import AuthenticationCheck from '../services/authCheck';
import taskController from '../controller/task';
const controller = new taskController();

const router = Router();

router.get('/:userid',(req: Request, res: Response) => {
    controller.getAllTasks(req, res)
}
);
router.get('/onetask/:taskid', (req: Request, res: Response) => controller.getOneTask(req, res));
router.post('/addtask/:userId', (req: Request, res: Response) => controller.addTask(req, res));
router.patch('/:taskid', (req: Request, res: Response) => controller.modifyTask(req, res));
router.delete('/:taskid', (req: Request, res: Response) => controller.deleteOneTask(req, res));

export default router;