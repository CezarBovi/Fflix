"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationController = void 0;
const http_status_codes_1 = require("http-status-codes");
class RecommendationController {
    constructor(recommendationService) {
        this.recommendationService = recommendationService;
        this.list = async (req, res) => {
            const userId = req.params.userId ?? req.user?.sub;
            if (!userId) {
                res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'Usuário não autenticado' });
                return;
            }
            const recommendations = this.recommendationService.getRecommendations(userId);
            res.status(http_status_codes_1.StatusCodes.OK).json(recommendations);
        };
        this.feedback = async (req, res) => {
            const userId = req.user?.sub;
            if (!userId) {
                res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'Usuário não autenticado' });
                return;
            }
            const { videoId, score } = req.body;
            const result = this.recommendationService.submitFeedback(userId, videoId, score);
            res.status(http_status_codes_1.StatusCodes.CREATED).json(result);
        };
    }
}
exports.RecommendationController = RecommendationController;
//# sourceMappingURL=RecommendationController.js.map