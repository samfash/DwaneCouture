import { getAdminMetrics } from "./admin.service";
import logger from "../../core/logger";
export const getAdminMetricsController = async (req, res) => {
    try {
        const metrics = await getAdminMetrics();
        res.status(200).json(metrics);
    }
    catch (error) {
        logger.error("❌ Failed to fetch admin metrics:", error);
        res.status(500).json({ error: "Failed to load metrics" });
    }
};
