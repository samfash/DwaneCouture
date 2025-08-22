import "dotenv/config";
import { createAdminUser } from "../modules/admin/createAdminUser";
(async () => {
    const user = await createAdminUser("admin@example.com", "SuperSecurePass123!");
    console.log("Admin created:", user);
    process.exit();
})();
