import {Router} from 'express';

const router = Router();

router.use('/',require('./user'));
router.use('/tasks',require('./task'))
router.use('/login',require('./auth'))

module.exports = router;