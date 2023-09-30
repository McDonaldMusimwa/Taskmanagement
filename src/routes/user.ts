import Router from 'express';
import UserController from '../controller/user';
import { Request, Response, NextFunction } from 'express';
let controller = new UserController();

const route = Router();
route.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
         controller.getUsers(req, res)
        
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }



});

/*
route.post('/user', async (req:Request, res:Response) => {
    try {
        // Call the createUser method from CreateUserController
        const response = await controller.createUser(req, res);

        // Handle the response from the createUser method
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


route.get('/user',async(req:Request,res:Response)=>{
    try{
        controller.getOneUser(req,res)
    }catch{
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
*/
module.exports = route;
