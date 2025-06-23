/*
  # Export Nodes System for Manufacturing

  1. New Tables
    - `export_nodes` - Stores exported Datakits and Codesheets as reusable nodes
    - `manufacturing_workflows` - Enhanced workflow storage with node references
    - `platform_downloads` - Track platform-specific downloads and licenses
    - `expansion_packs` - Manage feature expansion packs

  2. Security
    - Enable RLS on all new tables
    - Add policies for authenticated users
    - Add policies for platform-specific access

  3. Enhanced Features
    - Node versioning and metadata
    - Platform compatibility tracking
    - Download analytics
    - Expansion pack management
*/

-- Export Nodes table for storing Datakits and Codesheets as reusable components
CREATE TABLE IF NOT EXISTS export_nodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  node_type text NOT NULL CHECK (node_type IN ('datakit', 'codesheet')),
  source_id uuid NOT NULL, -- References original datakit or codesheet
  version text DEFAULT '1.0.0',
  metadata jsonb DEFAULT '{}',
  configuration jsonb DEFAULT '{}',
  inputs jsonb DEFAULT '[]',
  outputs jsonb DEFAULT '[]',
  platform_compatibility jsonb DEFAULT '{"web": true, "windows": true, "android": true}',
  is_public boolean DEFAULT false,
  download_count integer DEFAULT 0,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enhanced Manufacturing Workflows table
CREATE TABLE IF NOT EXISTS manufacturing_workflows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  workflow_data jsonb NOT NULL DEFAULT '{}',
  node_references jsonb DEFAULT '[]', -- References to export_nodes
  connections jsonb DEFAULT '[]',
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'building', 'completed', 'failed', 'exported')),
  progress integer DEFAULT 0,
  qml_config jsonb DEFAULT '{}',
  export_format text DEFAULT 'qml' CHECK (export_format IN ('qml', 'executable', 'mobile_app')),
  platform_targets jsonb DEFAULT '["web"]',
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Platform Downloads tracking
CREATE TABLE IF NOT EXISTS platform_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  platform text NOT NULL CHECK (platform IN ('windows', 'android', 'web')),
  download_type text NOT NULL CHECK (download_type IN ('core', 'expansion_pack')),
  package_name text NOT NULL,
  version text NOT NULL,
  license_type text DEFAULT 'free' CHECK (license_type IN ('free', 'premium', 'enterprise')),
  download_url text,
  expires_at timestamptz,
  download_count integer DEFAULT 0,
  last_downloaded_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Expansion Packs management
CREATE TABLE IF NOT EXISTS expansion_packs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  pack_type text NOT NULL CHECK (pack_type IN ('workshop', 'models', 'manufacturing', 'ai_assistant', 'enterprise')),
  features jsonb NOT NULL DEFAULT '[]',
  platform_support jsonb DEFAULT '{"web": true, "windows": true, "android": false}',
  price_tier text DEFAULT 'free' CHECK (price_tier IN ('free', 'basic', 'premium', 'enterprise')),
  requirements jsonb DEFAULT '{}',
  download_size_mb integer DEFAULT 0,
  version text DEFAULT '1.0.0',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Node Templates for common patterns
CREATE TABLE IF NOT EXISTS node_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  template_data jsonb NOT NULL,
  preview_image text,
  tags text[] DEFAULT '{}',
  usage_count integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE export_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE manufacturing_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE expansion_packs ENABLE ROW LEVEL SECURITY;
ALTER TABLE node_templates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for export_nodes
CREATE POLICY "Users can view public nodes and own nodes"
  ON export_nodes
  FOR SELECT
  TO authenticated
  USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can create their own nodes"
  ON export_nodes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own nodes"
  ON export_nodes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own nodes"
  ON export_nodes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for manufacturing_workflows
CREATE POLICY "Users can manage their own workflows"
  ON manufacturing_workflows
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for platform_downloads
CREATE POLICY "Users can view their own downloads"
  ON platform_downloads
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create download records"
  ON platform_downloads
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for expansion_packs (public read)
CREATE POLICY "Anyone can view active expansion packs"
  ON expansion_packs
  FOR SELECT
  TO authenticated
  USING (is_active = true);

-- RLS Policies for node_templates (public read)
CREATE POLICY "Anyone can view node templates"
  ON node_templates
  FOR SELECT
  TO authenticated
  USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_export_nodes_type_user ON export_nodes(node_type, user_id);
CREATE INDEX IF NOT EXISTS idx_export_nodes_public ON export_nodes(is_public, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_manufacturing_workflows_user ON manufacturing_workflows(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_platform_downloads_user_platform ON platform_downloads(user_id, platform);
CREATE INDEX IF NOT EXISTS idx_expansion_packs_type_active ON expansion_packs(pack_type, is_active);
CREATE INDEX IF NOT EXISTS idx_node_templates_category ON node_templates(category, is_featured);

-- Insert default expansion packs
INSERT INTO expansion_packs (name, description, pack_type, features, platform_support, price_tier, download_size_mb) VALUES
('Workshop Pro', 'Advanced workstation management with GPU support and container orchestration', 'workshop', 
 '["gpu_acceleration", "container_management", "advanced_monitoring", "team_collaboration"]',
 '{"web": true, "windows": true, "android": false}', 'premium', 250),

('AI Models Suite', 'Pre-trained models and advanced training capabilities', 'models',
 '["pretrained_models", "custom_training", "model_optimization", "deployment_automation"]',
 '{"web": true, "windows": true, "android": false}', 'premium', 500),

('Manufacturing Enterprise', 'Advanced workflow automation and enterprise features', 'manufacturing',
 '["advanced_workflows", "enterprise_integrations", "audit_logging", "compliance_tools"]',
 '{"web": true, "windows": true, "android": false}', 'enterprise', 180),

('AI Assistant Pro', 'Enhanced AI capabilities with voice commands and advanced automation', 'ai_assistant',
 '["voice_commands", "advanced_nlp", "custom_training", "api_integrations"]',
 '{"web": true, "windows": true, "android": true}', 'premium', 120);

-- Insert default node templates
INSERT INTO node_templates (name, category, template_data, tags) VALUES
('CSV Data Processor', 'datakit', 
 '{"type": "datakit", "config": {"file_types": ["csv"], "validation": true, "auto_clean": true}}',
 '{"data_processing", "csv", "validation"}'),

('Python Analysis Script', 'codesheet',
 '{"type": "codesheet", "language": "python", "template": "import pandas as pd\nimport numpy as np\n\n# Data analysis template"}',
 '{"python", "analysis", "pandas"}'),

('Image Classification Model', 'model',
 '{"type": "model", "framework": "tensorflow", "model_type": "classification", "input_shape": [224, 224, 3]}',
 '{"tensorflow", "classification", "computer_vision"}');

-- Functions for node export and management
CREATE OR REPLACE FUNCTION export_datakit_as_node(
  datakit_id uuid,
  node_name text,
  node_description text DEFAULT NULL
) RETURNS uuid AS $$
DECLARE
  new_node_id uuid;
  datakit_data record;
BEGIN
  -- Get datakit information
  SELECT * INTO datakit_data FROM datakits WHERE id = datakit_id AND user_id = auth.uid();
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Datakit not found or access denied';
  END IF;

  -- Create export node
  INSERT INTO export_nodes (
    name, description, node_type, source_id, metadata, configuration, 
    inputs, outputs, user_id
  ) VALUES (
    node_name,
    COALESCE(node_description, datakit_data.file_name || ' - Exported DataKit'),
    'datakit',
    datakit_id,
    jsonb_build_object(
      'original_filename', datakit_data.file_name,
      'file_type', datakit_data.file_type,
      'file_size', datakit_data.file_size,
      'quality_score', COALESCE(datakit_data.processing_status, 'unknown')
    ),
    jsonb_build_object(
      'auto_validation', true,
      'data_cleaning', true,
      'format_conversion', true
    ),
    '[]'::jsonb,
    '["data_output", "metadata"]'::jsonb,
    auth.uid()
  ) RETURNING id INTO new_node_id;

  RETURN new_node_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION export_codesheet_as_node(
  codesheet_id uuid,
  node_name text,
  node_description text DEFAULT NULL
) RETURNS uuid AS $$
DECLARE
  new_node_id uuid;
  codesheet_data record;
BEGIN
  -- Get codesheet information
  SELECT * INTO codesheet_data FROM codesheets WHERE id = codesheet_id AND user_id = auth.uid();
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Codesheet not found or access denied';
  END IF;

  -- Create export node
  INSERT INTO export_nodes (
    name, description, node_type, source_id, metadata, configuration,
    inputs, outputs, user_id
  ) VALUES (
    node_name,
    COALESCE(node_description, codesheet_data.title || ' - Exported CodeSheet'),
    'codesheet',
    codesheet_id,
    jsonb_build_object(
      'language_type', codesheet_data.language_type,
      'jupyter_notebook', codesheet_data.jupyter_notebook,
      'content_size', length(codesheet_data.content::text)
    ),
    jsonb_build_object(
      'execution_environment', codesheet_data.language_type,
      'auto_execute', false,
      'output_capture', true
    ),
    '["data_input", "parameters"]'::jsonb,
    '["processed_data", "results", "visualizations"]'::jsonb,
    auth.uid()
  ) RETURNING id INTO new_node_id;

  RETURN new_node_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to generate platform-specific download
CREATE OR REPLACE FUNCTION generate_platform_download(
  platform_name text,
  package_type text DEFAULT 'core'
) RETURNS jsonb AS $$
DECLARE
  download_record record;
  download_url text;
  expires_at timestamptz;
BEGIN
  -- Set expiration (24 hours for core, 7 days for expansion packs)
  expires_at := now() + CASE 
    WHEN package_type = 'core' THEN interval '24 hours'
    ELSE interval '7 days'
  END;

  -- Generate download URL (in real implementation, this would be a signed URL)
  download_url := format('https://downloads.quadrax-ml.com/%s/%s/%s.zip', 
    platform_name, package_type, extract(epoch from now())::text);

  -- Create download record
  INSERT INTO platform_downloads (
    user_id, platform, download_type, package_name, version,
    download_url, expires_at
  ) VALUES (
    auth.uid(), platform_name, package_type, 
    format('quadrax-ml-%s-%s', platform_name, package_type),
    '1.0.0', download_url, expires_at
  ) RETURNING * INTO download_record;

  RETURN jsonb_build_object(
    'download_id', download_record.id,
    'download_url', download_record.download_url,
    'expires_at', download_record.expires_at,
    'platform', download_record.platform,
    'package_name', download_record.package_name
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_export_nodes_updated_at
  BEFORE UPDATE ON export_nodes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_manufacturing_workflows_updated_at
  BEFORE UPDATE ON manufacturing_workflows
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_expansion_packs_updated_at
  BEFORE UPDATE ON expansion_packs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();