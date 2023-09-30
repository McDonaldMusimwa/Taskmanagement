"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controller/user"));
let controller = new user_1.default();
const route = (0, express_1.default)();
route.get('/', (req, res, next) => {
    try {
        controller.getUsers(req, res);
    }
    catch (error) {
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
//# sourceMappingURL=user.js.map