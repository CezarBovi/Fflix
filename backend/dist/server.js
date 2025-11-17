"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const environment_1 = require("./config/environment");
const logger_1 = require("./shared/utils/logger");
const app = (0, app_1.createApp)();
app.listen(environment_1.env.port, () => {
    logger_1.logger.info(`FFlix API rodando na porta ${environment_1.env.port}`);
});
//# sourceMappingURL=server.js.map