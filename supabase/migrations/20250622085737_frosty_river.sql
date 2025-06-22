/*
  # Initial Schema for QUADRAX•ML Platform

  1. New Tables
    - `profiles` - User profiles and settings
    - `user_sessions` - User activity tracking
    - `workstations` - Development environments
    - `datakits` - Dataset management
    - `models` - ML model tracking
    - `pipelines` - Workflow automation

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Create indexes for performance

  3. Functions and Triggers
    - Auto-create profile on user signup
    - Update timestamps automatically
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('standard', 'admin', 'super_admin');
CREATE TYPE workstation_function AS ENUM ('DEVELOPMENT', 'TRAINING', 'PROCESSING', 'INFERENCE', 'AUTOMATION', 'CUSTOM');
CREATE TYPE workstation_status AS ENUM ('CREATING', 'RUNNING', 'STOPPED', 'ERROR');
CREATE TYPE datakit_status AS ENUM ('UPLOADING', 'PROCESSING', 'READY', 'ERROR');
CREATE TYPE model_type AS ENUM ('CLASSIFICATION', 'REGRESSION', 'NLP', 'COMPUTER_VISION', 'CUSTOM');
CREATE TYPE model_framework AS ENUM ('TENSORFLOW', 'PYTORCH', 'SCIKIT_LEARN', 'CUSTOM');
CREATE TYPE model_status AS ENUM ('TRAINING', 'TRAINED', 'DEPLOYED', 'FAILED');
CREATE TYPE pipeline_status AS ENUM ('IDLE', 'RUNNING', 'COMPLETED', 'FAILED');

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role DEFAULT 'standard',
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User sessions table for activity tracking
CREATE TABLE IF NOT EXISTS user_sessions (
  id BIGSERIAL PRIMARY KEY,
  profile_id BIGINT REFERENCES profiles(id) ON DELETE CASCADE,
  session_start TIMESTAMPTZ DEFAULT NOW(),
  session_end TIMESTAMPTZ,
  screen_time INTERVAL,
  activity JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Workstations table
CREATE TABLE IF NOT EXISTS workstations (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  function workstation_function,
  nature TEXT[],
  status workstation_status DEFAULT 'CREATING',
  resources JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Datakits table
CREATE TABLE IF NOT EXISTS datakits (
  id BIGSERIAL PRIMARY KEY,
  file_name TEXT NOT NULL,
  file_size BIGINT,
  file_type TEXT,
  processing_status datakit_status DEFAULT 'UPLOADING',
  sources JSONB DEFAULT '{}',
  resources JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Models table
CREATE TABLE IF NOT EXISTS models (
  id BIGSERIAL PRIMARY KEY,
  model_name TEXT NOT NULL,
  model_type model_type,
  framework model_framework,
  status model_status DEFAULT 'TRAINING',
  performance_metrics JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pipelines table
CREATE TABLE IF NOT EXISTS pipelines (
  id BIGSERIAL PRIMARY KEY,
  pipeline_name TEXT NOT NULL,
  configuration JSONB DEFAULT '{}',
  status pipeline_status DEFAULT 'IDLE',
  schedule TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_profile_id ON user_sessions(profile_id);
CREATE INDEX IF NOT EXISTS idx_workstations_name ON workstations(name);
CREATE INDEX IF NOT EXISTS idx_datakits_file_name ON datakits(file_name);
CREATE INDEX IF NOT EXISTS idx_models_model_name ON models(model_name);
CREATE INDEX IF NOT EXISTS idx_pipelines_pipeline_name ON pipelines(pipeline_name);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE workstations ENABLE ROW LEVEL SECURITY;
ALTER TABLE datakits ENABLE ROW LEVEL SECURITY;
ALTER TABLE models ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipelines ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- User sessions policies
CREATE POLICY "Users can view own sessions"
  ON user_sessions FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = user_sessions.profile_id 
    AND profiles.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own sessions"
  ON user_sessions FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = user_sessions.profile_id 
    AND profiles.user_id = auth.uid()
  ));

-- Workstations policies
CREATE POLICY "Users can view own workstations"
  ON workstations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create workstations"
  ON workstations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own workstations"
  ON workstations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own workstations"
  ON workstations FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Datakits policies (shared resource, all authenticated users can view)
CREATE POLICY "Authenticated users can view datakits"
  ON datakits FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create datakits"
  ON datakits FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update datakits"
  ON datakits FOR UPDATE
  TO authenticated
  USING (true);

-- Models policies (shared resource, all authenticated users can view)
CREATE POLICY "Authenticated users can view models"
  ON models FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create models"
  ON models FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update models"
  ON models FOR UPDATE
  TO authenticated
  USING (true);

-- Pipelines policies (shared resource, all authenticated users can view)
CREATE POLICY "Authenticated users can view pipelines"
  ON pipelines FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create pipelines"
  ON pipelines FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update pipelines"
  ON pipelines FOR UPDATE
  TO authenticated
  USING (true);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, role, settings)
  VALUES (NEW.id, 'standard', '{"theme": "dark", "notifications": true, "language": "en"}');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call the function on user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_updated_at_profiles
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_updated_at_user_sessions
  BEFORE UPDATE ON user_sessions
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_updated_at_workstations
  BEFORE UPDATE ON workstations
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_updated_at_datakits
  BEFORE UPDATE ON datakits
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_updated_at_models
  BEFORE UPDATE ON models
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_updated_at_pipelines
  BEFORE UPDATE ON pipelines
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();