-- Seed data for QUADRAX•ML platform
-- This file contains initial data for development and testing

-- Insert sample users (these will be created via Supabase Auth)
-- The profiles will be created via triggers when users sign up

-- Insert sample workstations
INSERT INTO workstations (id, name, description, function, nature, status, resources, user_id, created_at, updated_at) VALUES
(1, 'ml-training-env-v2', 'Machine learning training environment with GPU support', 'TRAINING', '["machine-learning", "data-science"]', 'RUNNING', '{"cpu": 8, "memory": 16384, "storage": 200000, "gpu": true}', '00000000-0000-0000-0000-000000000001', NOW(), NOW()),
(2, 'data-processing-hub', 'High-performance data processing workstation', 'PROCESSING', '["data-engineering", "automation"]', 'STOPPED', '{"cpu": 16, "memory": 32768, "storage": 500000, "gpu": false}', '00000000-0000-0000-0000-000000000001', NOW(), NOW()),
(3, 'ai-research-lab', 'Advanced AI research and development environment', 'DEVELOPMENT', '["ai", "machine-learning"]', 'RUNNING', '{"cpu": 32, "memory": 65536, "storage": 1000000, "gpu": true}', '00000000-0000-0000-0000-000000000001', NOW(), NOW());

-- Insert sample datakits
INSERT INTO datakits (id, file_name, file_size, file_type, processing_status, sources, resources, created_at, updated_at) VALUES
(1, 'customer_analytics_2024.csv', 2500000000, 'csv', 'READY', '{"source": "customer_database", "last_updated": "2024-01-15"}', '{"quality_score": 96, "rows": 1250000, "columns": 15}', NOW(), NOW()),
(2, 'sales_data_q4.json', 890000000, 'json', 'READY', '{"source": "sales_api", "last_updated": "2024-01-10"}', '{"quality_score": 94, "rows": 500000, "columns": 12}', NOW(), NOW()),
(3, 'product_reviews.parquet', 1200000000, 'parquet', 'PROCESSING', '{"source": "review_scraper", "last_updated": "2024-01-14"}', '{"quality_score": 89, "rows": 2000000, "columns": 8}', NOW(), NOW());

-- Insert sample models
INSERT INTO models (id, model_name, model_type, framework, status, performance_metrics, created_at, updated_at) VALUES
(1, 'customer-classifier-v2.1', 'CLASSIFICATION', 'TENSORFLOW', 'DEPLOYED', '{"accuracy": 0.947, "precision": 0.952, "recall": 0.941, "f1_score": 0.946}', NOW(), NOW()),
(2, 'sentiment-analyzer-v3', 'NLP', 'PYTORCH', 'TRAINING', '{"accuracy": 0.873, "loss": 0.234}', NOW(), NOW()),
(3, 'recommendation-engine', 'CUSTOM', 'SCIKIT_LEARN', 'READY', '{"accuracy": 0.912, "precision": 0.908, "recall": 0.916}', NOW(), NOW());

-- Insert sample pipelines
INSERT INTO pipelines (id, pipeline_name, configuration, status, schedule, created_at, updated_at) VALUES
(1, 'customer-analysis-pipeline', '{"stages": [{"name": "data_ingestion", "type": "data"}, {"name": "preprocessing", "type": "transform"}, {"name": "model_training", "type": "ml"}]}', 'COMPLETED', '2024-01-16 02:00:00', NOW(), NOW()),
(2, 'fraud-detection-pipeline', '{"stages": [{"name": "data_validation", "type": "data"}, {"name": "feature_engineering", "type": "transform"}, {"name": "anomaly_detection", "type": "ml"}]}', 'RUNNING', '2024-01-16 06:00:00', NOW(), NOW()),
(3, 'recommendation-pipeline', '{"stages": [{"name": "user_data", "type": "data"}, {"name": "collaborative_filtering", "type": "ml"}, {"name": "deployment", "type": "deploy"}]}', 'IDLE', NULL, NOW(), NOW());

-- Insert sample user sessions (for activity tracking)
INSERT INTO user_sessions (id, profile_id, session_start, session_end, screen_time, activity, created_at, updated_at) VALUES
(1, 1, NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour', INTERVAL '1 hour', '{"pages_visited": ["dashboard", "workstations", "models"], "actions_performed": 15}', NOW(), NOW()),
(2, 1, NOW() - INTERVAL '1 day', NOW() - INTERVAL '23 hours', INTERVAL '1 hour 30 minutes', '{"pages_visited": ["datakits", "pipelines"], "actions_performed": 8}', NOW(), NOW());

-- Create some sample profiles (these would normally be created by triggers)
-- Note: In a real setup, these would be created when users sign up via Supabase Auth
INSERT INTO profiles (id, user_id, role, settings, created_at, updated_at) VALUES
(1, '00000000-0000-0000-0000-000000000001', 'admin', '{"theme": "dark", "notifications": true, "language": "en"}', NOW(), NOW()),
(2, '00000000-0000-0000-0000-000000000002', 'standard', '{"theme": "dark", "notifications": false, "language": "en"}', NOW(), NOW());