"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function AuthenticationCheck(req, res, next) {
    if (req.user) {
        return next();
    }
    res.status(401).json({ message: 'User not authenticated' });
}
exports.default = AuthenticationCheck;
//# sourceMappingURL=authCheck.js.map