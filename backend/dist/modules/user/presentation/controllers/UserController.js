"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_codes_1 = require("http-status-codes");
const userValidators_1 = require("../validators/userValidators");
class UserController {
    constructor(userService) {
        this.userService = userService;
        this.me = async (req, res) => {
            const userId = req.user?.sub;
            if (!userId) {
                res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'Usuário não autenticado' });
                return;
            }
            const profile = await this.userService.getProfile(userId);
            res.status(http_status_codes_1.StatusCodes.OK).json(profile);
        };
        this.updatePreferences = async (req, res) => {
            const userId = req.user?.sub;
            if (!userId) {
                res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'Usuário não autenticado' });
                return;
            }
            const payload = userValidators_1.updatePreferencesSchema.parse(req.body);
            const result = await this.userService.updatePreferences(userId, payload.preferences);
            res.status(http_status_codes_1.StatusCodes.OK).json(result);
        };
        this.history = async (req, res) => {
            const { id } = req.params;
            const history = await this.userService.getHistory(id);
            res.status(http_status_codes_1.StatusCodes.OK).json({ history });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map