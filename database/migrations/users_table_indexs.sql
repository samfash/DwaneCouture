-- ✅ Speed up email lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ✅ Speed up token lookups
CREATE INDEX IF NOT EXISTS idx_users_resetToken ON users(resetToken);

-- ✅ Make reset tokens nullable to avoid breaking existing logic
ALTER TABLE users ALTER COLUMN resetToken DROP NOT NULL;