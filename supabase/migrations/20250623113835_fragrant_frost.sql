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

-- Add unique constraints (only if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'workstations_name_user_unique' 
        AND table_name = 'workstations'
    ) THEN
        ALTER TABLE workstations 
        ADD CONSTRAINT workstations_name_user_unique 
        UNIQUE (name, user_id);
    END IF;
END $$;

-- Add additional indexes for performance (using IF NOT EXISTS)
CREATE INDEX IF NOT EXISTS idx_workstations_status ON workstations(status);
CREATE INDEX IF NOT EXISTS idx_workstations_user_status ON workstations(user_id, status);
CREATE INDEX IF NOT EXISTS idx_datakits_status ON datakits(processing_status);
CREATE INDEX IF NOT EXISTS idx_models_status ON models(status);
CREATE INDEX IF NOT EXISTS idx_models_type ON models(model_type);
CREATE INDEX IF NOT EXISTS idx_pipelines_status ON pipelines(status);
CREATE INDEX IF NOT EXISTS idx_user_sessions_start_time ON user_sessions(session_start);

-- Create composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_workstations_user_created ON workstations(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_models_type_status ON models(model_type, status);
CREATE INDEX IF NOT EXISTS idx_pipelines_status_schedule ON pipelines(status, schedule);

-- Create useful views (using CREATE OR REPLACE to handle existing views)

-- Active workstations view
CREATE OR REPLACE VIEW active_workstations AS
SELECT 
  w.*,
  p.role as user_role
FROM workstations w
JOIN profiles p ON w.user_id = p.user_id
WHERE w.status IN ('RUNNING', 'CREATING');

-- Model performance summary view
CREATE OR REPLACE VIEW model_performance_summary AS
SELECT 
  model_type,
  framework,
  COUNT(*) as total_models,
  COUNT(CASE WHEN status = 'DEPLOYED' THEN 1 END) as deployed_models,
  AVG((performance_metrics->>'accuracy')::float) as avg_accuracy
FROM models
WHERE performance_metrics->>'accuracy' IS NOT NULL
GROUP BY model_type, framework;

-- User activity summary view
CREATE OR REPLACE VIEW user_activity_summary AS
SELECT 
  p.user_id,
  p.role,
  COUNT(DISTINCT w.id) as total_workstations,
  COUNT(CASE WHEN w.status = 'RUNNING' THEN 1 END) as active_workstations,
  COUNT(DISTINCT us.id) as total_sessions,
  SUM(EXTRACT(EPOCH FROM us.screen_time)) / 3600 as total_hours
FROM profiles p
LEFT JOIN workstations w ON p.user_id = w.user_id
LEFT JOIN user_sessions us ON p.id = us.profile_id
GROUP BY p.user_id, p.role;

-- Recent activity view
CREATE OR REPLACE VIEW recent_activity AS
SELECT 
  'workstation' as activity_type,
  w.name as activity_name,
  w.status as activity_status,
  w.created_at as activity_time,
  w.user_id
FROM workstations w
WHERE w.created_at > NOW() - INTERVAL '7 days'

UNION ALL

SELECT 
  'model' as activity_type,
  m.model_name as activity_name,
  m.status as activity_status,
  m.created_at as activity_time,
  NULL as user_id
FROM models m
WHERE m.created_at > NOW() - INTERVAL '7 days'

UNION ALL

SELECT 
  'pipeline' as activity_type,
  man.id::text as activity_name,
  man.status as activity_status,
  man.created_at as activity_time,
  NULL as user_id
FROM manufacture man
WHERE man.created_at > NOW() - INTERVAL '7 days'

ORDER BY activity_time DESC;

-- Grant permissions on views
GRANT SELECT ON active_workstations TO authenticated;
GRANT SELECT ON model_performance_summary TO authenticated;
GRANT SELECT ON user_activity_summary TO authenticated;
GRANT SELECT ON recent_activity TO authenticated;