"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const http_status_codes_1 = require("http-status-codes");
const authValidators_1 = require("../validators/authValidators");
class AuthController {
    constructor(registerUser, loginUser, refreshToken) {
        this.registerUser = registerUser;
        this.loginUser = loginUser;
        this.refreshToken = refreshToken;
        this.register = async (req, res) => {
            const payload = authValidators_1.registerSchema.parse(req.body);
            const user = await this.registerUser.execute(payload);
            res.status(http_status_codes_1.StatusCodes.CREATED).json({ user: user.toSafeJSON() });
        };
        this.login = async (req, res) => {
            const payload = authValidators_1.loginSchema.parse(req.body);
            const result = await this.loginUser.execute(payload);
            res.status(http_status_codes_1.StatusCodes.OK).json(result);
        };
        this.refresh = async (req, res) => {
            const payload = authValidators_1.refreshSchema.parse(req.body);
            const tokens = await this.refreshToken.execute(payload);
            res.status(http_status_codes_1.StatusCodes.OK).json(tokens);
        };
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map