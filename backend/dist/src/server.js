import config from "./core/config";
import logger from "./core/logger";
import app from "./app";
const PORT = config.app.port || 5000;
app.listen(PORT, () => {
    logger.info(`🚀 App is running on port ${PORT}`);
});
