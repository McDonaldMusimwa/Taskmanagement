import { Router } from 'express';


const router = Router();

//router.use('/', require('./user'));
router.use('/auth', require('./auth').default)
router.use('/tasks', require('./task').default)


module.exports = router;