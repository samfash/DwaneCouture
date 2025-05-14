CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  full_name TEXT NOT NULL,
  gender TEXT CHECK (gender IN ('male', 'female')) NOT NULL,
  delivery_address TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE male_measurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  neck NUMERIC(5,2) NOT NULL,
  chest NUMERIC(5,2) NOT NULL,
  waist NUMERIC(5,2) NOT NULL,
  hips NUMERIC(5,2) NOT NULL,
  shoulder NUMERIC(5,2),
  thigh NUMERIC(5,2),
  sleeve_length NUMERIC(5,2),
  round_sleeve NUMERIC(5,2),
  wrist NUMERIC(5,2),
  shirt_length NUMERIC(5,2),
  trouser_length NUMERIC(5,2)
);

CREATE TABLE female_measurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  burst NUMERIC(5,2) NOT NULL,
  waist NUMERIC(5,2) NOT NULL,
  hips NUMERIC(5,2) NOT NULL,
  full_length NUMERIC(5,2) NOT NULL,
  shoulder NUMERIC(5,2),
  nipple_to_nipple NUMERIC(5,2),
  shoulder_to_under_burst NUMERIC(5,2),
  half_length NUMERIC(5,2),
  thigh NUMERIC(5,2),
  round_sleeve NUMERIC(5,2),
  wrist NUMERIC(5,2),
  sleeve_length NUMERIC(5,2),
  shirt_length NUMERIC(5,2),
  trouser_length NUMERIC(5,2)
);

-- Indexing for faster lookup
CREATE INDEX idx_profiles_user_id ON profiles(user_id);