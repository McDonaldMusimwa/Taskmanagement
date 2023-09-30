"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function AuthenticationCheck(req, res, next) {
    if (req.user) {
        return next();
    }
    res.status(401).redirect('/login');
}
exports.default = AuthenticationCheck;
//# sourceMappingURL=authCheck.js.map