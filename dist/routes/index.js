"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
//router.use('/', require('./user'));
router.use('/auth', require('./auth').default);
router.use('/tasks', require('./task').default);
module.exports = router;
//# sourceMappingURL=index.js.map