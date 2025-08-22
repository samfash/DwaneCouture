DROP TABLE users;

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK (role IN ('admin', 'user', 'tailor')) DEFAULT 'user',
    isOAuth BOOLEAN DEFAULT FALSE,
    resetToken TEXT,
    resetTokenExpiry TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
