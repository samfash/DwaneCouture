import dotenv from "dotenv";
dotenv.config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});
const isTest = process.env.NODE_ENV === "test"; // Check if running tests
export default {
    app: {
        port: process.env.PORT || 5000,
        env: process.env.NODE_ENV || "development",
        frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
        backendUrl: process.env.BACKEND_URL || "http://localhost:5000",
    },
    database: {
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASS || "password123",
        host: process.env.DB_HOST || "localhost",
        name: isTest ? process.env.TEST_DATABASE_NAME : process.env.DB_NAME || "mydatabase",
        port: Number(process.env.DB_PORT) || 5432,
        db_url: isTest ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL || "",
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET || "supersecuresecret",
        auth0Domain: process.env.AUTH0_DOMAIN || "",
        google_id: process.env.GOOGLE_CLIENT_ID || "",
        google_secret: process.env.GOOGLE_CLIENT_SECRET || "",
        google_callback: process.env.GOOGLE_CALLBACK_URL || "",
    },
    payment: {
        flutterwaveKey: process.env.FLUTTERWAVE_KEY || "",
        paystackKey: process.env.PAYSTACK_KEY || "",
        stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
    },
    email: {
        mailAddress: process.env.EMAIL_USER || "",
        googleAppPassword: process.env.CLIENT_PASS || "",
    },
    s3Bucket: {
        bucketName: process.env.S3_BUCKET_NAME || "your-bucket-name",
        accessKeyId: process.env.S3_ACCESS_KEY_ID || "your-access-key-id",
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "your-secret-access-key",
        region: process.env.S3_REGION || "your-region",
    },
};
