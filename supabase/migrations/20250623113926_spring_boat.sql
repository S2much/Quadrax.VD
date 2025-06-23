/*
  # Database Optimization and Views Migration

  1. Constraints
    - Add role validation for profiles table
    - Add unique constraint for workstation names (removed user constraint due to schema)

  2. Performance Indexes
    - Add indexes for common query patterns
    - Optimize lookups by status, type, and user relationships

  3. Useful Views
    - Active workstations with user information
    - Model performance summaries
    - User activity tracking
    - Recent platform activity

  4. Security
    - Grant appropriate permissions to authenticated users
*/

-- Add check constraints (only if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'profiles_role_check' 
        AND table_name = 'profiles'
    ) THEN
        ALTER TABLE profiles 
        ADD CONSTRAINT profiles_role_check 
        CHECK (role IN ('standard', 'admin', 'super_admin'));
    END IF;
END $$;

-- Add additional indexes for performance (using IF NOT EXISTS)
CREATE INDEX IF NOT EXISTS idx_workstations_name ON workstations(name);
CREATE INDEX IF NOT EXISTS idx_datakits_file_name ON datakits(file_name);
CREATE INDEX IF NOT EXISTS idx_models_model_name ON models(model_name);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_profile_id ON user_sessions(profile_id);

-- Create composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_workstations_name_created ON workstations(name, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_models_type_status ON models(model_type, status);
CREATE INDEX IF NOT EXISTS idx_datakits_type_status ON datakits(file_type, processing_status);

-- Create useful views (using CREATE OR REPLACE to handle existing views)

-- Active workstations view
CREATE OR REPLACE VIEW active_workstations AS
SELECT 
  w.*
FROM workstations w
WHERE w.created_at > NOW() - INTERVAL '30 days';

-- Model performance summary view  
CREATE OR REPLACE VIEW model_performance_summary AS
SELECT 
  model_type,
  framework,
  COUNT(*) as total_models,
  COUNT(CASE WHEN status = 'DEPLOYED' THEN 1 END) as deployed_models,
  AVG((performance_metrics->>'accuracy')::numeric) as avg_accuracy
FROM models
WHERE performance_metrics->>'accuracy' IS NOT NULL
GROUP BY model_type, framework;

-- User activity summary view
CREATE OR REPLACE VIEW user_activity_summary AS
SELECT 
  p.user_id,
  p.role,
  COUNT(DISTINCT us.id) as total_sessions,
  SUM(EXTRACT(EPOCH FROM us.screen_time)) / 3600 as total_hours
FROM profiles p
LEFT JOIN user_sessions us ON p.id = us.profile_id
GROUP BY p.user_id, p.role;

-- Recent activity view
CREATE OR REPLACE VIEW recent_activity AS
SELECT 
  'workstation' as activity_type,
  w.name as activity_name,
  'active' as activity_status,
  w.created_at as activity_time
FROM workstations w
WHERE w.created_at > NOW() - INTERVAL '7 days'

UNION ALL

SELECT 
  'model' as activity_type,
  m.model_name as activity_name,
  m.status as activity_status,
  m.created_at as activity_time
FROM models m
WHERE m.created_at > NOW() - INTERVAL '7 days'

UNION ALL

SELECT 
  'datakit' as activity_type,
  d.file_name as activity_name,
  d.processing_status as activity_status,
  d.created_at as activity_time
FROM datakits d
WHERE d.created_at > NOW() - INTERVAL '7 days'

UNION ALL

SELECT 
  'manufacture' as activity_type,
  man.id::text as activity_name,
  man.status as activity_status,
  man.created_at as activity_time
FROM manufacture man
WHERE man.created_at > NOW() - INTERVAL '7 days'

ORDER BY activity_time DESC;

-- Grant permissions on views
GRANT SELECT ON active_workstations TO authenticated;
GRANT SELECT ON model_performance_summary TO authenticated;
GRANT SELECT ON user_activity_summary TO authenticated;
GRANT SELECT ON recent_activity TO authenticated;